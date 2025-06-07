from rest_framework import serializers
from .models import Event, Lecture, Workshop, Subscription


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = [ 'title', 'description', 'date', 'hour', 'local', 'event' ]

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = [ 'title', 'description', 'date', 'hour', 'local', 'event' ]

class EventSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(many=True, read_only=True)
    workshop = WorkshopSerializer(many=True, read_only=True)

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