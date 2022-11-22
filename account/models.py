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
from service.file_upload import FileUpload
from service.geolocation import geoloc
import logging

from stranger.models import Stranger
logger = logging.getLogger('django')

# pyright: reportGeneralTypeIssues=false


class UserImageManager(models.Manager):
    def create(self, photo, user, spot):
        file_upload = FileUpload(photo, 'photos')
        photo_url, photo_filename = file_upload.upload()
        image = UserImage.objects.all().filter(user_id=user.id).filter(spot=spot)

        image.delete()
        image = self.model(
            user=user,
            filename=photo_filename,
            file_url=photo_url,
            spot=spot,
        )

        image.save()


class UserImage(models.Model):

    objects: UserImageManager = UserImageManager()

    user = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name='user_images'
    )
    filename = models.TextField(max_length=300,  blank=True,  null=True)
    file_url = models.TextField(max_length=350, blank=True, null=True)
    spot = models.CharField(max_length=50, blank=True, null=True)


class CustomUserManager(BaseUserManager):

    def populate_profile(self, pk: int):
        user = CustomUser.objects.all().filter(
            id=pk).first()

        if user is None:
            return {'type': 'error', 'data': 'User does not exist.'}
        user.images = user.user_images.all(
        )[0:3].values_list('file_url', flat=True)

        return {'type': 'ok', 'data': user}

    def update_profile(self, data,  pk: int):
        user = CustomUser.objects.get(pk=pk)
        user.interests = data['interests']
        user.basics = data['basics']
        user.prompts = data['prompts']
        user.bio = data['bio']

        user.save()

    def send_forgot_email(self, id: int, data):

        try:
            user = CustomUser.objects.filter(email=data['email']).first()
            if user is None:
                raise models.ObjectDoesNotExist

            token = RefreshToken.for_user(user)
            context = {'user': user.first_name, 'uid': user.id, 'token': token}
            message = render_to_string('forgot-password.html', context)
            refresh = str(token)

            mail = EmailMessage(
                subject="Password reset",
                body=message,
                from_email=settings.EMAIL_SENDER,
                to=[data['email']]
            )
            mail.content_subtype = 'html'
            mail.send()

            return {'type': 'ok', 'data': {'uid': user.id, 'token': refresh}}

        except (models.ObjectDoesNotExist):
            logger.error('Unable to send password reset email')
            return {'type': 'error', 'data': 'Email address does not exist.'}

    def logout(self, id: int, refresh_token):

        user = CustomUser.objects.get(pk=id)
        user.logged_in = False
        user.save()

        token = RefreshToken(refresh_token)
        token.blacklist()

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
        loc = geoloc.get_location()

        extra_fields['city'] = loc['city']
        extra_fields['state'] = loc['region']
        extra_fields['ip_address'] = loc['ip']
        extra_fields['latitude'] = loc['latitude']
        extra_fields['longitude'] = loc['longitude']

        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, password=password, **extra_fields)
        user.set_password(password)
        user.save()
        user.refresh_from_db()

        Stranger.objects.create(user, False)
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
    ip_address = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.CharField(max_length=100, blank=True, null=True)
    longitude = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=200, blank=True, null=True)
    first_name = models.CharField(max_length=200, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=200, blank=True, null=True)
    bio = models.CharField(max_length=150, blank=True, null=True)
    basics = models.JSONField(blank=True, null=True)
    prompts = models.JSONField(blank=True, null=True)
    dob = models.CharField(max_length=50, blank=True, null=True)
    interests = models.JSONField(blank=True, null=True)
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
