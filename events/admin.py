from django.contrib import admin
from django.core.exceptions import ValidationError 
from .models import Event, Activity, Guest, Subscription, StatusSubscription
from users.models import CustomUser
from certificates.models import Certificate, CertificateType 

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'eventColor')  
    search_fields = ('name',)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'start_time', 'event')
    list_filter = ('event', 'type')
    search_fields = ('title', 'event__name')

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__name',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(is_guest=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


@admin.action(description='Gerar Certificado para Inscrições selecionadas')
def generate_certificate_action(modeladmin, request, queryset):
    valid_subscriptions = queryset.filter(status=StatusSubscription.VALIDATED)
    
    success_count = 0
    for subscription in valid_subscriptions:
        cert_exists = Certificate.objects.filter(
            user=subscription.user,
            activity=subscription.activity,
            type=CertificateType.COMMON
        ).exists()

        if cert_exists:
            continue  

        try:
            certificate = Certificate(
                user=subscription.user,
                activity=subscription.activity,
                type=CertificateType.COMMON
            )
            certificate.full_clean()
            certificate.save()
            success_count += 1
        except ValidationError as e:
            modeladmin.message_user(
                request,
                f"Erro ao validar certificado para {subscription.user.name}: {e.messages}",
                level='error'
            )
        
    if success_count > 0:
        modeladmin.message_user(request, f'{success_count} certificado(s) foram gerados com sucesso.')
    else:
        modeladmin.message_user(request, 'Nenhum novo certificado a ser gerado para as inscrições selecionadas.', level='warning')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity', 'status', 'created_at')
    list_filter = ('status', 'activity__event')
    search_fields = ('user__name', 'activity__title')
    actions = [generate_certificate_action]