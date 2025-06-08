from django.db import models
from users.models import CustomUser
from django.utils import timezone

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False, blank=False)
    description = models.TextField()

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.name
    
class Lecture(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    date = models.DateField()
    hour = models.TimeField()
    local = models.CharField(max_length=50)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        db_table = 'lectures'

    def __str__(self):
        return self.title

class Workshop(models.Model):
    title = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    date = models.DateField()
    hour = models.TimeField()
    local = models.CharField(max_length=50)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        db_table = 'workshops'

    def __str__(self):
        return self.title

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