from django.db import models
from django.utils import timezone


class ProspectManager(models.Manager):
    def create(self):
        print('creating prospect')


class Prospect(models.Model):

    objects: ProspectManager = ProspectManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    prospect = models.ForeignKey(
        'account.CustomUser',
        related_name='prospect_prospects',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        'account.CustomUser',
        related_name='user_prospects',
        on_delete=models.CASCADE
    )
