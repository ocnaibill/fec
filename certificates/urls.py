from django.urls import path
from .views import CertificateGenerateView, CertificateValidateView

urlpatterns = [
    path('generate/<int:subscription_id>/', CertificateGenerateView.as_view(), name='generate-certificate'),
        path('validate/<uuid:uuid>/', CertificateValidateView.as_view(), name='validate-certificate'),
]