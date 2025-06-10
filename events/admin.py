from django.contrib import admin
from .models import Event, Activity, Lecture, Speaker, Workshop, Instructor

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('title', 'time', 'event')
    list_filter = ('event',)
    search_fields = ('title', 'event__name')

@admin.register(Lecture)
class LectureCardAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'event')
    list_filter = ('event',)
    search_fields = ('title', 'event__name')

@admin.register(Workshop)
class WorkshopAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'time', 'event')  # Campos exibidos na lista
    list_filter = ('event',)  # Filtro lateral por evento
    search_fields = ('title', 'event__name')  # Campos para busca
    
@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('cards',)

@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    filter_horizontal = ('workshops',) 