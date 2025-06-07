from django.shortcuts import render
from rest_framework.decorators import api_view
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
