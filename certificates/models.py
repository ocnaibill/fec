from django.db import models
import uuid
from events.models import Subscription, StatusSubscription
from django.utils import timezone
from django.core.exceptions import ValidationError
from .utils.certificate_generator import generate_certificate_pdf

# Create your models here.

class Certificate(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    file = models.FileField(upload_to='certificates/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if self.subscription.status != StatusSubscription.VALIDATED:
            raise ValidationError("Certificado só pode ser gerado para inscrições validadas.")

        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            user = self.subscription.user
            activity = self.subscription.activity

            pdf_file = generate_certificate_pdf(self.uuid, user.name, activity.title)
            self.file.save(f'certificado-{self.uuid}.pdf', pdf_file, save=False)   
            super().save(update_fields=['file'])

    class Meta:
        db_table = 'certificates'