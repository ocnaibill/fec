from django.urls import path
from .views import CarouselImageListView

urlpatterns = [
    path('images/', CarouselImageListView.as_view(), name='carousel-image-list'),
]