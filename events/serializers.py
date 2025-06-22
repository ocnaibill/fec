from rest_framework import serializers
from django.db.models import Q
from .models import Event, Activity, Guest, Subscription, StatusSubscription
from users.models import CustomUser

class GuestSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)

    class Meta:
        model = Guest
        fields = ['name', 'photo', 'bio']

class ActivitySerializer(serializers.ModelSerializer):
    guests = GuestSerializer(many=True, read_only=True)

    class Meta:
        model = Activity
        fields = ['id', 'event', 'title', 'description', 'date', 'time', 'local', 'type', 'guests']
    
class EventSerializer(serializers.ModelSerializer):
    lecture = serializers.SerializerMethodField()
    workshop = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'name', 'description', 'eventColor', 'logo', 'lecture', 'workshop']

    def get_lecture(self, obj):
        lectures = obj.activities.filter(type='palestra')
        return ActivitySerializer(lectures, many=True).data

    def get_workshop(self, obj):
        workshops = obj.activities.filter(type='oficina')
        return ActivitySerializer(workshops, many=True).data

class SubscriptionSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True)
    alert = serializers.SerializerMethodField()

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True,
    )

    activity_id = serializers.PrimaryKeyRelatedField(
        queryset=Activity.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Subscription
        fields = [
            'user_id',
            'activity_id',
            'id',
            'status',
            'created_at',
            'activity',
            'alert',
            'qrcode'
        ]
        read_only_fields = ['id', 'status', 'alert']

    def validate(self, data):
        activity = data.get('activity_id')
        user = data.get('user_id')

        if Subscription.objects.filter(user_id=user, activity_id=activity).exists():
            raise serializers.ValidationError('Não é possível emitir o mesmo ingresso novamente.')
        
        date = activity.date
        time = activity.time

        conflicting_subs = Subscription.objects.filter(
            user=user,
            status=StatusSubscription.EMITED
        ).filter(
            Q(activity__date=date, activity__time=time)
        )

        self._has_conflict = conflicting_subs.exists()

        return data
        
    
    def create(self, validated_data):
        user = validated_data.pop('user_id')
        activity = validated_data.pop('activity_id')

        subscription = Subscription.objects.create(
            user=user,
            activity=activity,
            **validated_data
        )

        subscription._has_conflict = getattr(self, '_has_conflict', False)
        return subscription
    
    def get_alert(self, obj):
        if hasattr(obj, '_has_conflict') and obj._has_conflict:
            return "Você já possui outro ingresso para este mesmo horário. Somente um poderá ser validado."
        return None