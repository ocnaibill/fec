from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager
def validate_svg_or_image(file):
    if not file.name.endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg')):
        raise ValidationError('O arquivo deve ser uma imagem (PNG, JPG, JPEG, GIF) ou SVG.')
    

# Create your models here.
class Roles(models.TextChoices):
    VISITOR = 'visitante', 'Visitante'
    CREDENCIADOR = 'credenciador', 'Credenciador'

class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=80, null=False, blank=False)
    email = models.EmailField(_("email address"), unique=True)
    cpf = models.CharField(max_length=11, unique=True, null=False, blank=False)
    birthdate = models.DateField(null=True, blank=True)

    photo = models.ImageField(
            upload_to='users_photos/', 
            null=True, 
            blank=True,
            validators=[validate_svg_or_image] 
        )
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    institution = models.CharField(max_length=50, blank=True)
    registration_number = models.CharField(max_length=25, blank=True)
    is_guest = models.BooleanField(default=False)
    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.VISITOR)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        db_table = 'users'    

    def save(self, *args, **kwargs):
            if self.pk:
                try:
                    old_instance = CustomUser.objects.get(pk=self.pk)
                    
                    if old_instance.photo and old_instance.photo != self.photo:
                        old_instance.photo.delete(save=False)
                except CustomUser.DoesNotExist:
                    pass 

            super().save(*args, **kwargs)
    def __str__(self):
        return self.email
    