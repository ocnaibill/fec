from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from users.models import CustomUser

# Create your views here.
@api_view(['POST'])
@permission_classes([])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {"error": "E-mail e senha são obrigatórios."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(email=email, password=password)

    if user is not None:
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"token": token.key, "message": "Login realizado com sucesso!"},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Conta desativada. Entre em contato com o suporte."},
                status=status.HTTP_403_FORBIDDEN
            )
    else:
        return Response(
            {"error": "Credenciais inválidas. Verifique seu e-mail e senha."},
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['POST'])
@permission_classes([])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = CustomUser.objects.get(email=request.data['email'])
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(request):
    return Response({})
