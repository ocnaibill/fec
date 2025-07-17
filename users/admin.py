from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib import messages

from .models import CustomUser
from events.models import Guest, Subscription, StatusSubscription # <<-- MODELOS ADICIONADOS
from certificates.models import Certificate # <<-- IMPORT ADICIONADO


# <<------------------ CÓDIGO DA NOVA AÇÃO ADICIONADO ABAIXO ------------------>>

@admin.action(description='Gerar todos os certificados pendentes para o(s) usuário(s)')
def generate_all_user_certificates(modeladmin, request, queryset):
    total_certs_generated = 0
    for user in queryset:
        # Busca todas as inscrições validadas do usuário que ainda não têm certificado
        subscriptions_to_process = Subscription.objects.filter(
            user=user,
            status=StatusSubscription.VALIDATED,
            certificate__isnull=True
        )
        
        for subscription in subscriptions_to_process:
            Certificate.objects.get_or_create(subscription=subscription)
            total_certs_generated += 1
            
    modeladmin.message_user(request, f'{total_certs_generated} certificado(s) pendentes foram gerados para os usuários selecionados.')


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_guest', 'role', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_guest', 'role', 'groups')
    list_editable = ('is_staff', 'is_guest', 'role', 'is_superuser')
    search_fields = ('email', 'name')
    ordering = ('email',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'cpf', 'birthdate', 'photo', 'institution', 'registration_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_guest', 'role', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {'fields': ('name', 'cpf', 'birthdate', 'photo', 'institution', 'registration_number')}),
    )

    # <<-- AÇÃO NOVA ADICIONADA À LISTA EXISTENTE -->>
    actions = ['make_guest', generate_all_user_certificates]

    @admin.action(description='Promover usuários selecionados a Convidados (Guest)')
    def make_guest(self, request, queryset):
        for user in queryset:
            user.is_guest = True
            user.save()
            
            Guest.objects.get_or_create(
                user=user, 
                defaults={'bio': 'Biografia a ser preenchida.'}
            )
        
        self.message_user(request, f"{queryset.count()} usuário(s) foram promovidos a convidados com sucesso.", messages.SUCCESS)