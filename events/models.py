from django.db import models
from django.db.models import Q
from users.models import CustomUser
from django.utils import timezone
from django.core.exceptions import ValidationError

from django.core.files.base import ContentFile
from io import BytesIO
import uuid
import qrcode

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
    start_time = models.TimeField()
    end_time = models.TimeField()
    local = models.CharField(max_length=50)
    type = models.CharField(max_length=8, choices=TypeActivity.choices)
    event = models.ForeignKey(Event, related_name='activities', on_delete=models.CASCADE)
    guests = models.ManyToManyField(Guest) 

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.title} at {self.start_time}"
    
class StatusSubscription(models.TextChoices):
    EMITED = 'emitida', 'Emitida'
    VALIDATED = 'validada', 'Validada'
    EXPIRED = 'expirada', 'Expirada'
    CANCELED = 'cancelada', 'Cancelada'
    CONFLITANT = 'conflitante', 'Conflitante'

class Subscription(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    status = models.CharField(max_length=12, choices=StatusSubscription.choices, default=StatusSubscription.EMITED)
    qrcode = models.ImageField(upload_to='subscriptions-qrcodes/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_status = self.status

    def generate_qrcode(self):
        qr = qrcode.make(self.uuid)
        buffer = BytesIO()

        qr.save(buffer, format='PNG')
        self.qrcode.save(f'{self.uuid}.png', ContentFile(buffer.getvalue()), save=False)

    def mark_conflitants_when_validated(self):
        end_time = self.activity.end_time
        
        conflicting_subs = Subscription.objects.filter(
            user=self.user,
            status=StatusSubscription.EMITED
        ).exclude(id=self.id).filter(
            activity__date=self.activity.date,
            activity__start_time__lt=end_time,
            activity__end_time__gt=self.activity.start_time,
        )

        conflicting_subs.update(status=StatusSubscription.CONFLITANT)

    def save(self, *args, **kwargs):
        if not self.qrcode:
            self.generate_qrcode()

        status_changed = self.pk and self._original_status != self.status
        super().save(*args, **kwargs)

        if status_changed and self.status == StatusSubscription.VALIDATED:
            self.mark_conflitants_when_validated()
        self._original_status = self.status

    class Meta:
        db_table = 'subscriptions'