from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Event, Activity, Guest, Subscription
from .serializers import EventSerializer, ActivitySerializer, Guest, SubscriptionSerializer
from rest_framework import status

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
        subs = Subscription.objects.filter(user_id=user.id).exclude(status='cancelada')
    except Subscription.DoesNotExist:
        return Response({'erro': 'Nenhuma inscrição realizada.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SubscriptionSerializer(subs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_subscription(request, subscription_id):
    try:
        subscription = Subscription.objects.get(id=subscription_id, user=request.user)
        subscription.status = 'cancelada' 
        subscription.save()
        return Response({'message': 'Inscrição cancelada com sucesso.'}, status=status.HTTP_200_OK)
    except Subscription.DoesNotExist:
        return Response({'error': 'Inscrição não encontrada.'}, status=status.HTTP_404_NOT_FOUND)