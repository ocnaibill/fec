from rest_framework import serializers
from django.db.models import Min, Max 
from .models import Certificate, CertificateType
from events.models import Activity 

class CertificateValidationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    activity_title = serializers.CharField(source='activity.title', read_only=True, allow_null=True)
    activity_date = serializers.DateField(source='activity.date', read_only=True, allow_null=True)
    
    festival_start_date = serializers.SerializerMethodField()
    festival_end_date = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = [
            'uuid',
            'user_name',
            'activity_title',
            'activity_date',
            'created_at',
            'type',
            'festival_start_date', 
            'festival_end_date',   
        ]

    def get_festival_start_date(self, obj):
        if obj.type == CertificateType.CREDENCIADOR:
            if Activity.objects.exists():
                return Activity.objects.aggregate(min_date=Min('date'))['min_date']
        return None

    def get_festival_end_date(self, obj):
        if obj.type == CertificateType.CREDENCIADOR:
            if Activity.objects.exists():
                return Activity.objects.aggregate(max_date=Max('date'))['max_date']
        return None