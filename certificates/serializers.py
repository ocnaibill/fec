from rest_framework import serializers
from .models import Certificate

class CertificateValidationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='subscription.user.name', read_only=True)
    activity_title = serializers.CharField(source='subscription.activity.title', read_only=True)
    activity_date = serializers.DateField(source='subscription.activity.date', read_only=True)

    class Meta:
        model = Certificate
        fields = [
            'uuid',
            'user_name',
            'activity_title',
            'activity_date',
            'created_at' 
        ]