from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer

from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from users.models import CustomUser

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

import os

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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    serializer = UserSerializer(user, context={'request': request})
    return Response(serializer.data, status=200)


@api_view(['PATCH']) 
@permission_classes([IsAuthenticated])
def update_user_data(request):
    user = request.user
    
    serializer = UserUpdateSerializer(instance=user, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Logout realizado com sucesso.'}, status=status.HTTP_200_OK)
    except:
        return Response({'erro': 'Erro ao realizar logout.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([])
def password_reset_request(request):
    email = request.data.get('email')
    user = CustomUser.objects.filter(email=email).first()

    if user:
        uuid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        front_url = os.environ.get('FRONTEND_URL', 'url_do_front')

        reset_link = f"{front_url}/reset-password/{uuid}/{token}"
        
        send_mail(
            subject='Redefinição de senha',
            message=f'Clique no link para redefinir sua senha: {reset_link}',
            from_email='no-reply@cajui.com',
            recipient_list=[user.email]
        )

    return Response({'message': 'Se o e-mail for válido, enviaremos um link de redefinição.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([])
def password_reset_confirm(request):
    uuidb64 = request.data.get('uuid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    try:
        uuid = urlsafe_base64_decode(uuidb64).decode()
        user = CustomUser.objects.get(pk=uuid)
    except:
        return Response({'error': 'Link inválido'}, status=status.HTTP_400_BAD_REQUEST)

    if default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()

        return Response({'message': 'Senha redefinida com sucesso!'}, status=status.HTTP_200_OK)

    return Response({'error': 'Token inválido ou expirado'}, status=status.HTTP_400_BAD_REQUEST)