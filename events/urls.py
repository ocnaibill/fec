from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_event, name='create_event'),
    path('activity/', views.create_activity_on_event),
    path('list/', views.list_events, name='list_events'),
    path('<int:event_pk>/details/', views.list_event_details, name='list_events_details'),
    path('<int:event_pk>/activities/', views.list_event_activities, name='event_activities'), 
    path('<int:event_pk>/lectures/', views.list_event_lectures, name='event_lectures'),
    path('<int:event_pk>/workshops/', views.list_event_workshops, name='event_workshops'),
    path('subscribe/', views.subscribe_to_event, name='subscribe'),
    path('cancel-subscription/<int:subscription_id>/', views.cancel_subscription, name='cancel_subscription'),
    path('mysubs/', views.list_subscriptions, name='list_user_subscribed_activities'),
    
]