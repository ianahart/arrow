from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta
from django.contrib.auth import hashers

from rest_framework_simplejwt.backends import TokenBackend

from account.models import CustomUser


class PasswordResetManager(models.Manager):

    def reset_password(self, data, user_id):
        decoded_token = TokenBackend(
            algorithm='HS256',
        ).decode(data['token'], verify=False)

        if user_id != decoded_token['user_id']:  # type: ignore
            return {'type': 'error', 'error': 'Forbidden action'}

        token = PasswordReset.objects.all().filter(
            token=data['token']).filter(user_id=user_id).first()

        if token is not None:
            elapsed = datetime.now(timezone.utc) - token.created_at

            if elapsed > timedelta(1):
                return {'type': 'error', 'error': 'The reset password link has expired.'}

            user = CustomUser.objects.all().filter(id=user_id).first()

            user.password = hashers.make_password(data['password'])
            user.save()

            return {'type': 'ok', 'error': None}

    def create(self, data, user):
        prev_resets = PasswordReset.objects.all().filter(
            user_id=data['data']['uid'])

        for prev_reset in prev_resets:
            prev_reset.delete()

        password_reset = self.model(
            token=data['data']['token'],
            user=user
        )
        password_reset.save()


class PasswordReset(models.Model):

    objects: PasswordResetManager = PasswordResetManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    token = models.TextField(max_length=400)
    user = models.ForeignKey('account.CustomUser',
                             on_delete=models.CASCADE, related_name='password_reset')

    def __str__(self):
        return self.token
