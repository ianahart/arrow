from django.db import models
from django.utils import timezone
from rest_framework.exceptions import NotFound, ParseError
import logging
logger = logging.getLogger('django')


class SettingManager(models.Manager):

    def update(self, data, pk: int):
        try:
            distance_away, age, gender = data.values()

            setting = Setting.objects.get(pk=pk)

            setting.age = age
            setting.gender = gender
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
    distance_away = models.IntegerField(blank=True,  null=True)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True,  null=True)
    user = models.OneToOneField(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name='user_settings',
    )
