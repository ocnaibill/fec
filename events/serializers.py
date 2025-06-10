from rest_framework import serializers
from django.db.models import Q
from .models import Event, Activity, Lecture, Speaker, Instructor, Workshop, Subscription, StatusSubscription
from users.models import CustomUser

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'time', 'title']

class SpeakerSerializer(serializers.ModelSerializer):
    cards = serializers.PrimaryKeyRelatedField(many=True, queryset=Lecture.objects.all())  

    class Meta:
        model = Speaker
        fields = ['name', 'bio', 'cards']

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ['id', 'name', 'bio']

class LectureSerializer(serializers.ModelSerializer):
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )
    speakers = SpeakerSerializer(many=True, required=False)  

    class Meta:
        model = Lecture
        fields = ['event', 'title', 'description', 'date', 'time', 'local', 'event_id', 'speakers']
        read_only_fields = ['event']

    def create(self, validated_data):
        event = validated_data.pop('event_id')
        speakers_data = validated_data.pop('speakers', []) 
        lecture = Lecture.objects.create(event=event, **validated_data)

        for speaker_data in speakers_data:
            Speaker.objects.create(card=lecture, **speaker_data)

        return lecture

    def update(self, instance, validated_data):
        speakers_data = validated_data.pop('speakers', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if speakers_data is not None:
            instance.speakers.all().delete()  
            for speaker_data in speakers_data:
                Speaker.objects.create(card=instance, **speaker_data)

        return instance
            
class WorkshopSerializer(serializers.ModelSerializer):
    event_id = serializers.PrimaryKeyRelatedField(
        queryset=Event.objects.all(),
        write_only=True,
        required=True,
        allow_null=False
    )
    instructors = InstructorSerializer(many=True, required=False)  

    class Meta:
        model = Workshop
        fields = ['id', 'title', 'description', 'date', 'time', 'local', 'event', 'event_id', 'instructors']
        read_only_fields = ['event']

    def create(self, validated_data):
        event = validated_data.pop('event_id')
        instructors_data = validated_data.pop('instructors', [])  
        workshop = Workshop.objects.create(event=event, **validated_data)

        for instructor_data in instructors_data:
            instructor, created = Instructor.objects.get_or_create(**instructor_data)
            workshop.instructors.add(instructor)

        return workshop

    def update(self, instance, validated_data):
        instructors_data = validated_data.pop('instructors', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if instructors_data is not None:
            instance.instructors.clear()  
            for instructor_data in instructors_data:
                instructor, created = Instructor.objects.get_or_create(**instructor_data)
                instance.instructors.add(instructor)

        return instance
    
class EventSerializer(serializers.ModelSerializer):
    lecture = LectureSerializer(many=True, read_only=True, source='lecture_set')
    workshop = WorkshopSerializer(many=True, read_only=True, source='workshop_set')
    activities = ActivitySerializer(many=True, read_only=True)  

    class Meta:
        model = Event
        fields = [ 'id', 'name', 'description', 'lecture', 'workshop', 'activities' ]

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
        time = lecture.time if workshop is None else workshop.time

        conflicting_subs = Subscription.objects.filter(
            user=user,
            status=StatusSubscription.EMITED
        ).filter(
            Q(lecture__date=date, lecture__time=time) |
            Q(workshop__date=date, workshop__time=time)
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