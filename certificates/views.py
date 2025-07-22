from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.core.exceptions import ValidationError
from users.models import Roles
from events.models import Activity, Subscription, StatusSubscription
from .models import Certificate, CertificateType
from .serializers import CertificateValidationSerializer

class CertificateGenerateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Gera um certificado para o usuário logado.
        Espera {'type': 'comum|credenciador|convidado', 'activity_id': 123} no corpo.
        'activity_id' é opcional para o tipo 'credenciador'.
        """
        cert_type = request.data.get('type')
        activity_id = request.data.get('activity_id')
        user = request.user

        if not cert_type or cert_type not in CertificateType.values:
            return Response(
                {"detail": "Tipo de certificado inválido ou não fornecido."},
                status=status.HTTP_400_BAD_REQUEST
            )

        activity = None
        if activity_id:
            activity = get_object_or_404(Activity, id=activity_id)
        
        try:
            certificate = Certificate.objects.get(user=user, activity=activity, type=cert_type)
        except Certificate.DoesNotExist:
            certificate = Certificate(user=user, activity=activity, type=cert_type)
            try:
                certificate.full_clean()
                certificate.save() 
            except ValidationError as e:
                return Response(e.message_dict, status=status.HTTP_400_BAD_REQUEST)

        if not certificate.file:
            certificate.refresh_from_db()
            if not certificate.file:
                return Response(
                    {"detail": "Ocorreu um erro ao carregar o arquivo do certificado."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        response = HttpResponse(certificate.file.read(), content_type='application/pdf')
        response['Content-Disposition'] = f'inline; filename="certificado-{certificate.uuid}.pdf"'
        
        return response


class CertificateValidateView(generics.RetrieveAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateValidationSerializer
    lookup_field = 'uuid'
    permission_classes = []


class AvailableCertificatesView(APIView):
    """
    Lista todos os certificados disponíveis para o usuário logado.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        available_certs = []
        
        validated_subscriptions = Subscription.objects.filter(
            user=user,
            status=StatusSubscription.VALIDATED
        ).select_related('activity')

        for sub in validated_subscriptions:
            available_certs.append({
                "key": f"comum-{sub.activity.id}",
                "type": "comum",
                "activity_id": sub.activity.id,
                "title": sub.activity.title,
                "date": sub.activity.date,
                "start_time": sub.activity.start_time,
                "location": sub.activity.local,
            })

        guest_activities = Activity.objects.filter(guests__user=user).distinct()
        
        for activity in guest_activities:
            if not any(cert['key'] == f"comum-{activity.id}" for cert in available_certs):
                available_certs.append({
                    "key": f"convidado-{activity.id}",
                    "type": "convidado",
                    "activity_id": activity.id,
                    "title": activity.title,
                    "date": activity.date,
                    "start_time": activity.start_time,
                    "location": activity.local,
                })

        if user.role == Roles.CREDENCIADOR:
            available_certs.append({
                "key": "credenciador-geral",
                "type": "credenciador",
                "activity_id": None, 
                "title": "Certificado de Organização",
                "date": "2024-07-23",
                "start_time": "08:00",
                "location": "III Festival da Economia Criativa",
            })

        return Response(available_certs, status=status.HTTP_200_OK)
