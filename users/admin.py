from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib import messages

from .models import CustomUser
from events.models import Guest 

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

    
    actions = ['make_guest']

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