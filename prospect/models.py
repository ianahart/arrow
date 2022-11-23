from django.db import models
from django.utils import timezone


class ProspectManager(models.Manager):
    def create(self, user, stranger, denied):
        prospect_user = self.model(
            user=user,
            seen=True,
            denied=denied,
            stranger=stranger,
        )

        prospect_user.save()


class Prospect(models.Model):

    objects: ProspectManager = ProspectManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    seen = models.BooleanField(default=False)  # type:ignore
    denied = models.BooleanField(default=False)  # type:ignore
    stranger = models.ForeignKey(
        'stranger.Stranger',
        related_name='prospect_strangers',
        on_delete=models.CASCADE, blank=True, null=True,
    )
    user = models.ForeignKey(
        'account.CustomUser',
        related_name='user_prospects',
        on_delete=models.CASCADE
    )
