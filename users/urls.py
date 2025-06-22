from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('signup', views.signup, name='signup'),
    path('logout', views.logout, name='logout'),
    path('password-reset', views.password_reset_request, name='password-reset'),
    path('password-reset-confirm', views.password_reset_confirm, name='password-reset-confirm'),
    path('me', views.get_user_data, name='get-user-data'),
    path('me/update/', views.update_user_data, name='update-user-data'),
]