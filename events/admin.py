from django.contrib import admin
from .models import Event, Activity, Guest
from users.models import CustomUser

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
    list_display = ('user__name',)
    search_fields = ('user__name',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = CustomUser.objects.filter(is_guest=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)