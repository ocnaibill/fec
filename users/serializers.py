from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="Este e-mail já está em uso."
            )
        ]
    )

    cpf = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=CustomUser.objects.all(),
                message="Este CPF já está cadastrado."
            )
        ]
    )

    class Meta(object):
        model = CustomUser
        fields = [ 
            'name', 
            'email', 
            'cpf', 
            'birthdate',
            'institution',
            'registration_number',
            'photo',
            'password'
        ]

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    
    def validate(self, data):
        if data.get('institution') == 'UCB' and not data.get('registration_number'):
            raise serializers.ValidationError({
                'registration_number': 'Número de matrícula é obrigatório para UCB.'
            })
        return data
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'name', 
            'email', 
            'cpf', 
            'birthdate', 
            'institution', 
            'registration_number',
            'photo' 
        ]

    def validate_email(self, value):
        user = self.instance
        if CustomUser.objects.filter(email=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("Este e-mail já está em uso.")
        return value

    def validate_cpf(self, value):
        user = self.instance
        if CustomUser.objects.filter(cpf=value).exclude(pk=user.pk).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado.")
        return value