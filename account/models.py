from datetime import datetime, timedelta, date
from typing import Dict, Union
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import BaseUserManager, AbstractUser, PermissionsMixin
from rest_framework_simplejwt.backends import TokenBackend
from django.db import models, DatabaseError
from django.contrib.auth import hashers
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.core.mail import EmailMessage
from core import settings
import logging
logger = logging.getLogger('django')
# pyright: reportGeneralTypeIssues=false


class CustomUserManager(BaseUserManager):

    def refresh_user(self, user: 'CustomUser', authorization: str):
        access_token = authorization.split('Bearer ')[1]
        decoded_token = None

        try:
            decoded_token = TokenBackend(
                algorithm='HS256'
            ).decode(access_token, verify=False)

        except IndexError:
            logger.error('Malformed token inside get user by token')

        if decoded_token and decoded_token is not None:
            obj = CustomUser.objects.get(pk=decoded_token['user_id'])
            return None if obj.pk != user.pk else obj

    def login(self, data: Dict[str, str]):
        res = {}

        password, email = data.values()

        user_exists = self.user_by_email(email)

        if user_exists is None:
            res['type'] = 'error'
            res['data'] = 'User does not exist.'
            return res

        if not hashers.check_password(password, user_exists.password):
            res['type'] = 'error'
            res['data'] = 'Invalid credentials.'
            return res

        refresh_token = RefreshToken.for_user(user_exists)
        access_token = refresh_token.access_token
        access_token.set_exp(lifetime=timedelta(days=3))

        tokens = {
            'access_token':  str(access_token),
            'refresh_token': str(refresh_token)
        }

        user_exists.logged_in = True
        user_exists.save()
        user_exists.refresh_from_db()

        res['type'] = 'ok'
        res['data'] = {'tokens': tokens, 'user': user_exists}

        return res

    def user_by_email(self, email):
        return CustomUser.objects.all().filter(email=email).first()

    def create(self, email: str, password: str, **extra_fields) -> None:
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email: str, password: str, **extra_fields) -> None:
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create(email, password, **extra_fields)


class CustomUser(AbstractUser, PermissionsMixin):
    username = None
    logged_in = models.BooleanField(default=False)
    avatar_file = models.TextField(max_length=500, blank=True, null=True)
    avatar_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    latitude = models.CharField(max_length=100, blank=True, null=True)
    longitude = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(_(
        'email address'),
        unique=True,
        blank=True,
        null=True,
        error_messages={'unique':
                        'A user with this email already exists.'
                        }
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects: CustomUserManager = CustomUserManager()

    def __str__(self):
        return f"{self.email}"

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'
