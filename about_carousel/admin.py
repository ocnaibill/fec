from django.contrib import admin
from .models import CarouselImage

@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'uploaded_at')
    list_filter = ('uploaded_at',)