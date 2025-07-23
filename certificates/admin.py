from django.contrib import admin, messages
from django.urls import path
from django.shortcuts import redirect
from django.template.response import TemplateResponse
from django.core.exceptions import ValidationError
from django.core.mail import EmailMessage  

from .models import Certificate, CertificateType
from events.models import Subscription, StatusSubscription

@admin.action(description='Enviar certificados selecionados por e-mail')
def send_certificate_email(modeladmin, request, queryset):
    """
    Ação que envia um e-mail com o certificado em PDF para cada usuário selecionado.
    """
    success_count = 0
    error_count = 0

    for certificate in queryset:
        if not certificate.file:
            continue

        user = certificate.user
        subject = "Seu Certificado - III Festival da Economia Criativa"
        body = f"""
Olá, {user.name}!

É com grande alegria que enviamos o seu certificado de participação no III Festival da Economia Criativa.
Ele está em anexo neste e-mail.

Agradecemos imensamente a sua presença!

Atenciosamente,
Equipe do Festival da Economia Criativa
"""
        
        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email=None,  #
                to=[user.email]
            )

            email.attach(
                certificate.file.name.split('/')[-1],
                certificate.file.read(),
                'application/pdf'
            )
            
            email.send()
            success_count += 1

        except Exception as e:
            messages.error(request, f"Falha ao enviar e-mail para {user.email}: {e}")
            error_count += 1
            
    if success_count > 0:
        messages.success(request, f"{success_count} certificado(s) foram enviados com sucesso.")
    if error_count > 0:
        messages.warning(request, f"{error_count} e-mail(s) não puderam ser enviados.")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'get_user_name', 'get_activity_title', 'type', 'created_at')
    list_filter = ('created_at', 'type')
    search_fields = ('uuid', 'user__name', 'activity__title')
    readonly_fields = ('uuid', 'user', 'activity', 'file', 'created_at', 'type')
    
    actions = [send_certificate_email] 

    @admin.display(description='Usuário', ordering='user__name')
    def get_user_name(self, obj):
        return obj.user.name

    @admin.display(description='Atividade', ordering='activity__title')
    def get_activity_title(self, obj):
        return obj.activity.title if obj.activity else '---'
    
    def has_add_permission(self, request):
        return False

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'generate-all/',
                self.admin_site.admin_view(self.generate_all_view),
                name='certificates-generate-all',
            ),
        ]
        return custom_urls + urls

    def generate_all_view(self, request):
        if request.method == 'POST':
            subscriptions = Subscription.objects.filter(status=StatusSubscription.VALIDATED)
            count = 0
            errors = 0

            for sub in subscriptions:
                if Certificate.objects.filter(
                    user=sub.user, 
                    activity=sub.activity, 
                    type=CertificateType.COMMON
                ).exists():
                    continue

                certificate = Certificate(
                    user=sub.user,
                    activity=sub.activity,
                    type=CertificateType.COMMON
                )
                try:
                    certificate.full_clean()
                    certificate.save()
                    count += 1
                except ValidationError as e:
                    errors += 1
                    self.message_user(
                        request,
                        f"Erro para {sub.user.name} em '{sub.activity.title}': {e.message_dict}",
                        messages.ERROR
                    )
            
            if count > 0:
                self.message_user(request, f'{count} certificado(s) de participação foram gerados.', messages.SUCCESS)
            if errors > 0:
                self.message_user(request, f'Ocorreram {errors} erros de validação.', messages.WARNING)
            if count == 0 and errors == 0:
                self.message_user(request, 'Nenhum novo certificado a ser gerado.', messages.INFO)
            
            return redirect('admin:certificates_certificate_changelist')

        context = dict(
           self.admin_site.each_context(request),
           title="Gerar Certificados para Inscrições Validadas",
        )
        return TemplateResponse(request, "admin/generate_all_certificates.html", context)