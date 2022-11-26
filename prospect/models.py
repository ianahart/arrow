from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta


class ProspectManager(models.Manager):

    def match_prospect(self, user_one, user_two):
        match = Prospect.objects.all().filter(
            stranger__user_id=user_one).filter(user_id=user_two).first()
        match.matched = True
        match.save()

    def reset(self, user):
        Prospect.objects.all().filter(
            user_id=user.id).filter(
            created_at__lte=datetime.now(tz=timezone.utc) - timedelta(days=1)).filter(
            denied=True
        ).delete()

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
    matched = models.BooleanField(default=False)  # type:ignore
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
