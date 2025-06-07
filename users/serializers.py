from rest_framework import serializers
from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = CustomUser
        fields = [ 
            'name', 
            'email', 
            'cpf', 
            'password'
        ]