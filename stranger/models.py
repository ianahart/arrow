from django.db import models
from django.utils import timezone


class StrangerMananger(models.Manager):

    def create(self, user, seen: bool):
        stranger = self.model(
            user=user,
            seen=seen,
        )

        stranger.save()

    def retrieve_stranger(self, user):
        stranger = Stranger.objects.all().filter(
            seen=False).exclude(user_id=user.id).first()

       # stranger = Stranger.objects.all().filter(
        #    seen=False).exclude(user_id=user.id).filter(user_id=10).first()

        stranger.images = stranger.user.user_images.all(
        )[0:3].values_list('file_url', flat=True)

        return stranger


class Stranger(models.Model):

    objects: StrangerMananger = StrangerMananger()

    created_at = models.DateTimeField(default=timezone.now)
    seen = models.BooleanField(default=False)  # type:ignore
    updated_at = models.DateTimeField(default=timezone.now)
    seen_by = models.ForeignKey(
        'account.CustomUser',
        related_name='stranger_seenbys',
        on_delete=models.CASCADE,
        blank=True, null=True
    )
    user = models.ForeignKey(
        'account.CustomUser',
        related_name='user_strangers',
        on_delete=models.CASCADE
    )
