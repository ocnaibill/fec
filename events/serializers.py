from rest_framework import serializers
from .models import Event, Lecture, Workshop, Subscription


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
        fields = [ 'id', 'name', 'lecture', 'workshop']

class SubscriptionSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(read_only=True)
    workshop = WorkshopSerializer(read_only=True)

    user_id = serializers.PrimaryKeyRelatedField(
        queryset='user',
        write_only=True,
        required=True,
        allow_null=False
    )

    lecture_id = serializers.PrimaryKeyRelatedField(
        queryset='lecture',
        write_only=True,
        required=False,
        allow_null=True
    )

    workshop_id = serializers.PrimaryKeyRelatedField(
        queryset='workshop',
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
            'lecture',
            'workshop',
            'user_id',
            'lecture_id',
            'workshop_id'
        ]

    def validate(self, data):
        lecture = data.get('lecture')
        workshop = data.get('workshop')

        if bool(lecture) == bool(workshop):
            raise serializers.ValidationError('A inscrição deve ser feita em uma atividade por vez.')
        
        return data