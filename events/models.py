from django.db import models
from users.models import CustomUser
from django.utils import timezone
from django.core.exceptions import ValidationError

# Create your models here.

def validate_svg_or_image(file):
    if not file.name.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
        raise ValidationError('O arquivo deve ser uma imagem (PNG, JPG, JPEG, GIF) ou SVG.')

class Event(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False, blank=False)
    description = models.TextField()
    eventColor = models.CharField(max_length=7, default='#000000') 
    logo = models.FileField(upload_to='event_logos/', null=True, blank=True, validators=[validate_svg_or_image])  

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.name

class Activity(models.Model):
    time = models.TimeField()
    title = models.CharField(max_length=100)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='activities')

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.title} at {self.time}"
    

class Lecture(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    local = models.CharField(max_length=50)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        db_table = 'lectures'

    def __str__(self):
        return self.title

class Speaker(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    cards = models.ManyToManyField('Lecture', related_name='speakers') 

    class Meta:
        db_table = 'speakers'

    def __str__(self):
        return self.name
    
class Workshop(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    local = models.CharField(max_length=50)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        db_table = 'workshops'

    def __str__(self):
        return self.title

class Instructor(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField()
    workshops = models.ManyToManyField('Workshop', related_name='instructors')  # Relacionamento ManyToMany

    class Meta:
        db_table = 'instructors'

    def __str__(self):
        return self.name
    
class StatusSubscription(models.TextChoices):
    EMITED = 'emitida', 'Emitida'
    VALIDATED = 'validada', 'Validada'
    EXPIRED = 'expirada', 'Expirada'
    CANCELED = 'cancelada', 'Cancelada'
    CONFLITANT = 'conflitante', 'Conflitante'

class Subscription(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, null=True, blank=True, on_delete=models.CASCADE)
    workshop = models.ForeignKey(Workshop, null=True, blank=True, on_delete=models.CASCADE)
    status = models.CharField(max_length=12, choices=StatusSubscription.choices, default=StatusSubscription.EMITED)
    created_at = models.DateTimeField(default=timezone.now)

    def clean(self):
        from django.core.exceptions import ValidationError

        if bool(self.lecture) == bool(self.workshop):
            raise ValidationError('A inscrição deve ser feita em uma atividade por vez.')
        
    class Meta:
        db_table = 'subscriptions'