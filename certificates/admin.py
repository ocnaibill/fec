from django.contrib import admin, messages
from django.urls import path
from django.shortcuts import render, redirect
from django.template.response import TemplateResponse

from .models import Certificate
from events.models import Subscription, StatusSubscription # Verifique se a importação está correta

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('uuid', 'get_user_name', 'get_activity_title', 'created_at', 'file')
    list_filter = ('created_at',)
    search_fields = ('uuid', 'subscription__user__name', 'subscription__activity__title')
    readonly_fields = ('uuid', 'subscription', 'file', 'created_at')

    @admin.display(description='Usuário', ordering='subscription__user__name')
    def get_user_name(self, obj):
        return obj.subscription.user.name

    @admin.display(description='Atividade', ordering='subscription__activity__title')
    def get_activity_title(self, obj):
        return obj.subscription.activity.title

    def has_add_permission(self, request):
        # Impede a criação manual de certificados vazios pelo admin
        return False
    
    # --- Lógica para a página de geração em massa ---

    def get_urls(self):
        """
        Adiciona a URL para nossa view customizada ao admin.
        A URL será algo como: /admin/certificates/certificate/generate-all/
        """
        urls = super().get_urls()
        custom_urls = [
            path(
                'generate-all/',
                self.admin_site.admin_view(self.generate_all_view),
                name='certificates-generate-all', # Nome para referenciar a URL
            ),
        ]
        return custom_urls + urls

    def generate_all_view(self, request):
        """
        A view que lida com a página de confirmação e a geração dos certificados.
        """
        # Se o formulário for enviado (método POST)
        if request.method == 'POST':
            # 1. Encontra todas as inscrições válidas que ainda não têm certificado
            subscriptions_to_process = Subscription.objects.filter(
                status=StatusSubscription.VALIDATED,
                certificate__isnull=True
            )
            count = 0
            for subscription in subscriptions_to_process:
                Certificate.objects.get_or_create(subscription=subscription)
                count += 1
            
            # 2. Envia uma mensagem de sucesso para o admin
            self.message_user(request, f'{count} certificado(s) foram gerados com sucesso.', messages.SUCCESS)
            
            # 3. Redireciona de volta para o painel principal do admin
            return redirect('admin:index')

        # Se for um acesso normal (método GET), mostra a página de confirmação
        context = dict(
           self.admin_site.each_context(request),
           title="Gerar Certificados em Massa", # Título da página
        )
        
        # Renderiza o template que criaremos a seguir
        return TemplateResponse(request, "admin/generate_all_certificates.html", context)