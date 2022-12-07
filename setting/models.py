from django.db import models
from django.utils import timezone
from rest_framework.exceptions import NotFound, ParseError
import logging
logger = logging.getLogger('django')


class SettingManager(models.Manager):

    def update(self, data, pk: int):
        try:
            distance_away, min_age, max_age, gender = data.values()

            setting = Setting.objects.get(pk=pk)

            setting.gender = gender
            setting.min_age = min_age
            setting.max_age = max_age
            setting.distance_away = distance_away

            setting.save()

        except ParseError:
            logger.error('Unable to update settings')

    def create(self, user):
        try:
            setting = self.model(user=user)

            setting.save()
            setting.refresh_from_db()

            return setting

        except ParseError:
            logger.error('Unable to  create user setting')

    def retrieve(self, data):
        try:

            user_id = data.id
            setting = Setting.objects.all().filter(user_id=user_id).first()
            return setting
        except NotFound:
            logger.error('Unable to retrieve a user\'s setting')


class Setting(models.Model):

    objects: SettingManager = SettingManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    distance_away = models.IntegerField(
        default=20, blank=True,  null=True)  # type:ignore
    min_age = models.IntegerField(
        default=18, blank=True, null=True)  # type:ignore
    max_age = models.IntegerField(
        default=36, blank=True, null=True)  # type:ignore
    gender = models.CharField(
        default='man', max_length=100, blank=True,  null=True)
    user = models.OneToOneField(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name='user_settings',
    )
