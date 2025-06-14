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

class Guest(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    photo = models.FileField(upload_to='guests_photos/', null=True, blank=True, validators=[validate_svg_or_image])
    bio = models.TextField()

    class Meta:
        db_table = 'guests'

    def __str__(self):
        return self.user.name

class TypeActivity(models.TextChoices):
        LECTURE = 'palestra', 'Palestra',
        WORKSHOP = 'oficina', 'Oficina'

class Activity(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    local = models.CharField(max_length=50)
    type = models.CharField(max_length=8, choices=TypeActivity.choices)
    event = models.ForeignKey(Event, related_name='activities', on_delete=models.CASCADE)
    guests = models.ManyToManyField(Guest) 

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.title} at {self.time}"
    
class StatusSubscription(models.TextChoices):
    EMITED = 'emitida', 'Emitida'
    VALIDATED = 'validada', 'Validada'
    EXPIRED = 'expirada', 'Expirada'
    CANCELED = 'cancelada', 'Cancelada'
    CONFLITANT = 'conflitante', 'Conflitante'

class Subscription(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    status = models.CharField(max_length=12, choices=StatusSubscription.choices, default=StatusSubscription.EMITED)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'subscriptions'