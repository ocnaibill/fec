from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager

# Create your models here.
class Roles(models.TextChoices):
    VISITOR = 'visitante', 'Visitante'
    CREDENCIADOR = 'credenciador', 'Credenciador'

class CustomUser(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=80, null=False, blank=False)
    email = models.EmailField(_("email address"), unique=True)
    cpf = models.CharField(max_length=11, unique=True, null=False, blank=False)
    birthdate = models.DateField(null=True, blank=True)

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

    def __str__(self):
        return self.email
    