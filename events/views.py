from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.permissions import IsCredentiator
from rest_framework.response import Response

from .models import Event, Activity, Guest, Subscription, StatusSubscription
from .serializers import EventSerializer, ActivitySerializer, Guest, SubscriptionSerializer
from rest_framework import status

from datetime import datetime, time
import uuid

# Create your views here.

# EVENTOS
@api_view(['GET'])
@permission_classes([AllowAny]) 
def list_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_event(requests):
    serializer = EventSerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([])
def list_event_details(requests, event_pk):
    try:
        event = Event.objects.get(pk=event_pk)
    except Event.DoesNotExist:
        return Response({'erro': 'Evento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)

# ATIVIDADES
@api_view(['GET'])
@permission_classes([])
def list_event_activities(requests, event_pk):
    try:
        activities = Activity.objects.filter(event_id=event_pk)
    except Activity.DoesNotExist:
        return Response({'erro': 'Nenhuma atividade associada ao evento.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ActivitySerializer(activities, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_activity_on_event(requests):
    serializer = ActivitySerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# PALESTRAS
@api_view(['GET'])
@permission_classes([])
def list_event_lectures(requests, event_pk):
    try:
        lectures = Activity.objects.filter(event_id=event_pk, type='palestra')
    except Activity.DoesNotExist:
        return Response({'erro': 'Nenhuma palestra associada ao evento.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ActivitySerializer(lectures, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# OFICINAS
@api_view(['GET'])
@permission_classes([])
def list_event_workshops(requests, event_pk):
    try:
        workshops = Activity.objects.filter(event_id=event_pk, type='oficina')
    except Activity.DoesNotExist:
        return Response({'erro': 'Nenhuma oficina associada ao evento.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ActivitySerializer(workshops, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# INSCRIÇÕES
@api_view(['POST'])
def subscribe_to_event(requests):
    user = requests.user
    serializer = SubscriptionSerializer(data={**requests.data, 'user_id': user.id})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_subscriptions(requests):
    user = requests.user

    try:
        subs = Subscription.objects.filter(user_id=user.id, status=StatusSubscription.EMITED)
    except Subscription.DoesNotExist:
        return Response({'erro': 'Nenhuma inscrição realizada.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SubscriptionSerializer(subs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsCredentiator])
def get_subscription(request, sub_uuid):
    try:
        uuid_obj = uuid.UUID(sub_uuid)
    except ValueError:
        return Response({'erro': 'Código em formato inválido.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    try:
        sub = Subscription.objects.get(uuid=uuid_obj)
    except Subscription.DoesNotExist:
        return Response({'erro': 'Nenhuma inscrição associada a este código.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SubscriptionSerializer(sub)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsCredentiator])
def validate_subscription(request, sub_uuid):
    try:
        uuid_obj = uuid.UUID(sub_uuid)
    except ValueError:
        return Response({'erro': 'Código em formato inválido.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    try:
        sub = Subscription.objects.get(uuid=uuid_obj)
        activity = sub.activity
    except Subscription.DoesNotExist:
        return Response({'erro': 'Nenhuma inscrição associada a este código.'}, status=status.HTTP_404_NOT_FOUND)

    if sub.status != 'emitida': 
        return Response({'erro': f'Inscrição inválida. O status da inscrição é {sub.status}'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    if activity.date != datetime.now().date():
        return Response({'erro': 'A atividade não ocorre no dia de hoje.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    if activity.end_time <= datetime.now().time():
        return Response({'erro': f'A atividade já foi encerrada.'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    sub.status = StatusSubscription.VALIDATED
    sub.save()
    
    serializer = SubscriptionSerializer(sub)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_subscription(request, subscription_id):
    try:
        subscription = Subscription.objects.get(id=subscription_id, user=request.user)
        subscription.status = StatusSubscription.CANCELED
        subscription.save()
        return Response({'message': 'Inscrição cancelada com sucesso.'}, status=status.HTTP_200_OK)
    except Subscription.DoesNotExist:
        return Response({'error': 'Inscrição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
