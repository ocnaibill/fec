from django.urls import path
from .views import CertificateGenerateView, CertificateValidateView, AvailableCertificatesView 
urlpatterns = [
    path('generate/', CertificateGenerateView.as_view(), name='generate-certificate'),
    path('validate/<uuid:uuid>/', CertificateValidateView.as_view(), name='validate-certificate'),
    path('available/', AvailableCertificatesView.as_view(), name='available-certificates'),
]