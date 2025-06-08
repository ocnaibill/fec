from django.shortcuts import render

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Event, Lecture, Workshop, Subscription
from .serializers import EventSerializer, LectureSerializer, WorkshopSerializer, SubscriptionSerializer
from rest_framework import status

# Create your views here.

# EVENTOS
@api_view(['POST'])
def create_event(requests):
    serializer = EventSerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_event_details(requests, event_pk):
    try:
        event = Event.objects.get(pk=event_pk)
    except Event.DoesNotExist:
        return Response({'erro': 'Evento não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = EventSerializer(event)
    return Response(serializer.data, status=status.HTTP_200_OK)

# PALESTRAS
@api_view(['POST'])
def add_lecture_to_event(requests):
    serializer = LectureSerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_event_lectures(requests, event_pk):
    try:
        lectures = Lecture.objects.filter(event_id=event_pk)
    except Lecture.DoesNotExist:
        return Response({'erro': 'Nenhuma palestra associada ao evento.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = LectureSerializer(lectures, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# OFICINAS
@api_view(['POST'])
def add_workshop_to_event(requests):
    serializer = WorkshopSerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_event_workshops(requests, event_pk):
    try:
        workshop = Workshop.objects.filter(event_id=event_pk)
    except Workshop.DoesNotExist:
        return Response({'erro': 'Nenhuma oficina associada ao evento.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = WorkshopSerializer(workshop, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# INSCRIÇÕES
@api_view(['POST'])
def subscribe_to_event(requests):
    serializer = SubscriptionSerializer(data=requests.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_subscriptions(requests):
    user = requests.user

    try:
        subs = Subscription.objects.filter(user_id=user.id)
    except Subscription.DoesNotExist:
        return Response({'erro': 'Nenhuma inscrição realizada.'})
    
    serializer = SubscriptionSerializer(subs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)