from rest_framework import serializers
from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta(object):
        model = CustomUser
        fields = [ 
            'name', 
            'email', 
            'cpf', 
            'birthdate',
            'institution',
            'registration_number',
            'password'
        ]

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)