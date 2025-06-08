from rest_framework import serializers
from django.db.models import Q
from .models import Event, Lecture, Workshop, Subscription, StatusSubscription
from users.models import CustomUser


class LectureSerializer(serializers.ModelSerializer):
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )

    class Meta:
        model = Lecture
        fields = [ 'event', 'title', 'description', 'date', 'hour', 'local', 'event_id' ]
        read_only_fields = ['event']

    def create(self, validated_data):
        event = validated_data.pop('event_id')
        lecture = Lecture.objects.create(event=event, **validated_data)

        return lecture

class WorkshopSerializer(serializers.ModelSerializer):
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )

    class Meta:
        model = Workshop
        fields = [ 'event', 'title', 'description', 'date', 'hour', 'local', 'event_id' ]
        read_only_fields = ['event']

    def create(self, validated_data):
        event = validated_data.pop('event_id')
        workshop = Workshop.objects.create(event=event, **validated_data)

        return workshop

class EventSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(many=True, read_only=True, source='lecture_set')
    workshop = WorkshopSerializer(many=True, read_only=True, source='workshop_set')

    class Meta:
        model = Event
        fields = [ 'id', 'name', 'description', 'lecture', 'workshop']

class SubscriptionSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(read_only=True)
    workshop = WorkshopSerializer(read_only=True)
    alert = serializers.SerializerMethodField()

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        write_only=True,
    )

    lecture_id = serializers.PrimaryKeyRelatedField(
        queryset=Lecture.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )

    workshop_id = serializers.PrimaryKeyRelatedField(
        queryset=Workshop.objects.all(),
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Subscription
        fields = [
            'id',
            'status',
            'created_at',
            'user_id',
            'lecture_id',
            'workshop_id',
            'lecture',
            'workshop',
            'alert'
        ]
        read_only_fields = ['id', 'status', 'alert']

    def validate(self, data):
        lecture = data.get('lecture_id')
        workshop = data.get('workshop_id')
        user = data.get('user_id')

        if bool(lecture) == bool(workshop):
            raise serializers.ValidationError('A inscrição deve ser feita em uma atividade por vez.')
 
        if Subscription.objects.filter(user_id=user, lecture_id=lecture, workshop_id=workshop).exists():
            raise serializers.ValidationError('Não é possível emitir o mesmo ingresso novamente.')
        
        date = lecture.date if workshop is None else workshop.date
        hour = lecture.hour if workshop is None else workshop.hour

        conflicting_subs = Subscription.objects.filter(
            user=user,
            status=StatusSubscription.EMITED
        ).filter(
            Q(lecture__date=date, lecture__hour=hour) |
            Q(workshop__date=date, workshop__hour=hour)
        )

        self._has_conflict = conflicting_subs.exists()

        return data
        
    
    def create(self, validated_data):
        user = validated_data.pop('user_id')
        lecture = validated_data.pop('lecture_id', None)
        workshop = validated_data.pop('workshop_id', None)

        subscription = Subscription.objects.create(
            user=user,
            lecture=lecture,
            workshop=workshop,
            **validated_data
        )

        subscription._has_conflict = getattr(self, '_has_conflict', False)
        return subscription
    
    def get_alert(self, obj):
        if hasattr(obj, '_has_conflict') and obj._has_conflict:
            return "Você já possui outro ingresso para este mesmo horário. Somente um poderá ser validado."
        return None