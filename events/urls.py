from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_event, name='create_event'),
    path('<int:event_pk>/', views.list_event_details, name='event_activities'),
]