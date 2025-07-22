from rest_framework import serializers
from .models import Certificate, CertificateType

class CertificateValidationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    activity_title = serializers.CharField(source='activity.title', read_only=True, allow_null=True)
    activity_date = serializers.DateField(source='activity.date', read_only=True, allow_null=True)

    class Meta:
        model = Certificate
        fields = [
            'uuid',
            'user_name',
            'activity_title',
            'activity_date',
            'created_at',
            'type'  
        ]