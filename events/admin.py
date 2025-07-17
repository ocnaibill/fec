from django.contrib import admin
from .models import Event, Activity, Guest, Subscription, StatusSubscription # <<-- MODELOS ADICIONADOS
from users.models import CustomUser
from certificates.models import Certificate # <<-- IMPORT ADICIONADO

# Seus Admins existentes (sem alteração)
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
    list_display = ('user',) # Alterado para mostrar o objeto user
    search_fields = ('user__name',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(is_guest=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

# <<------------------ CÓDIGO ADICIONADO ABAIXO ------------------>>

@admin.action(description='Gerar Certificado para Inscrições selecionadas')
def generate_certificate_action(modeladmin, request, queryset):
    # Filtra apenas pelas inscrições que foram validadas
    valid_subscriptions = queryset.filter(status=StatusSubscription.VALIDATED)
    
    # Filtra para não gerar certificados duplicados
    subscriptions_to_process = valid_subscriptions.filter(certificate__isnull=True)
    
    count = 0
    for subscription in subscriptions_to_process:
        # A lógica do seu models.py cuidará da geração do PDF
        Certificate.objects.get_or_create(subscription=subscription)
        count += 1
        
    modeladmin.message_user(request, f'{count} certificado(s) foram gerados com sucesso.')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity', 'status', 'created_at')
    list_filter = ('status', 'activity__event')
    search_fields = ('user__name', 'activity__title')
    
    # Adiciona a nova ação ao admin
    actions = [generate_certificate_action]