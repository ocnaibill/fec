from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from users.models import CustomUser

# Create your views here.
@api_view(['POST'])
def login(request):
    return Response({})

@api_view(['POST'])
def signup(request):
    return Response({})

@api_view(['POST'])
def logout(request):
    return Response({})
