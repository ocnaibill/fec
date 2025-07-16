from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from events.models import Subscription, StatusSubscription
from .models import Certificate
from .serializers import CertificateValidationSerializer
from .utils.certificate_generator import generate_certificate_pdf

class CertificateGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, subscription_id, *args, **kwargs):
        subscription = get_object_or_404(
            Subscription, 
            id=subscription_id, 
            user=request.user
        )

        if subscription.status != StatusSubscription.VALIDATED: 
            return Response(
                {"detail": "O certificado só está disponível para inscrições com check-in realizado."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        certificate, created = Certificate.objects.get_or_create(subscription=subscription)

        if created:
            certificate.refresh_from_db()
        
        if not certificate.file:
            return Response(
                {"detail": "Ocorreu um erro ao gerar o arquivo do certificado."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        pdf_file = certificate.file.read()
        
        response = HttpResponse(pdf_file, content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="certificado-{certificate.uuid}.pdf"'
        
        return response

class CertificateValidateView(generics.RetrieveAPIView):

    queryset = Certificate.objects.all()
    serializer_class = CertificateValidationSerializer
    lookup_field = 'uuid' 
    permission_classes = [] 
