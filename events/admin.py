from django.contrib import admin
from .models import Event, Activity, Guest

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'eventColor')  
    search_fields = ('name',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'event')
    list_filter = ('event', 'type')
    search_fields = ('title', 'event__name')

@admin.register(Guest)
class GuestAdmin(admin.ModelAdmin):
    list_display = ('user__name',)
    search_fields = ('user__name',)
