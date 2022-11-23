from django.db import models
from django.utils import timezone
from rest_framework.exceptions import NotFound
from prospect.models import Prospect
from service.geolocation import GeoLocation


class StrangerMananger(models.Manager):

    def deny_user(self, data, user):
        stranger = Stranger.objects.filter(user_id=data['user'].id).first()
        Prospect.objects.create(user, stranger, True)

    def create(self, user, seen: bool):
        stranger = self.model(
            user=user,
            seen=seen,
        )

        stranger.save()

    def retrieve_stranger(self, user):

        Prospect.objects.reset(user)

        ids = Stranger.objects.all().filter(
            prospect_strangers__denied=True).filter(
            prospect_strangers__user_id=user.id).exclude(
            user_id=user.id).values_list('user_id', flat=True)

        stranger = Stranger.objects.all().exclude(
            user_id__in=ids).exclude(user_id=user.id).first()

        if stranger is None:
            raise NotFound(
                'No more users, try changing your location preferences.')

        geo = GeoLocation()
        distance = geo.get_distance(
            stranger.user.latitude,
            stranger.user.longitude,
            user.latitude,
            user.longitude
        )

        stranger.distance = round(distance)

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
