from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_event, name='create_event'),
    path('<int:event_pk>/', views.list_event_details, name='event_activities'),
    path('lecture/', views.add_lecture_to_event, name='create_lecture'),
    path('lecture/<int:event_pk>/', views.list_event_lectures, name='event_lectures'),
    path('workshop/', views.add_workshop_to_event, name='create_workshop'),
    path('workshop/<int:event_pk>/', views.list_event_workshops, name='event_workshops'),
    path('subscribe/', views.subscribe_to_event, name='subscribe'),
]