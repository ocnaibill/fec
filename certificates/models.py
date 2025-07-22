from django.db import models
import uuid
from users.models import CustomUser, Roles
from events.models import Activity, Subscription, StatusSubscription, Guest
from django.utils import timezone
from django.core.exceptions import ValidationError
from .utils.certificate_generator import generate_certificate_pdf

# Create your models here.
class CertificateType(models.TextChoices):
    COMMON = 'comum', 'Comum'
    CREDENCIADOR = 'credenciador', 'Credenciador',
    GUEST = 'convidado', 'Convidado'

class Certificate(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    type = models.CharField(max_length=12, choices=CertificateType.choices)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.DO_NOTHING, null=True, blank=True)
    file = models.FileField(upload_to='certificates/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def clean(self):
        from django.core.exceptions import ValidationError

        if self.type != CertificateType.CREDENCIADOR and not self.activity:
            raise ValidationError('Atividade é obrigatória para este tipo de certificado.')

        if self.type == CertificateType.CREDENCIADOR:
            if self.activity is not None:
                raise ValidationError('Certificado de credenciador não deve estar vinculado a uma atividade.')
            if self.user.role != Roles.CREDENCIADOR:
                raise ValidationError('Usuário não é um credenciador.')
            return

        if self.type == CertificateType.GUEST:
            if not self.activity.guests.filter(user=self.user).exists():
                raise ValidationError('Usuário não é um convidado desta atividade.')
            return

        if self.type == CertificateType.COMMON:
            try:
                sub = Subscription.objects.get(user=self.user, activity=self.activity)
            except Subscription.DoesNotExist:
                raise ValidationError('Usuário não possui inscrição nesta atividade.')

            if sub.status != StatusSubscription.VALIDATED:
                raise ValidationError('A inscrição do usuário não foi validada.')
            return

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)

        if is_new:
            pdf_file = generate_certificate_pdf(self)
            self.file.save(f'certificado-{self.uuid}.pdf', pdf_file, save=False)   
            super().save(update_fields=['file'])

    class Meta:
        db_table = 'certificates'