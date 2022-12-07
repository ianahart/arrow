from django.db import models
from django.http.response import datetime
from django.utils import timezone
from rest_framework.exceptions import NotFound
from prospect.models import Prospect
from service.geolocation import GeoLocation


class StrangerMananger(models.Manager):

    def retrieve_profile(self, id: int, user):
        profile = Stranger.objects.all().filter(user_id=id).first()

        geo = GeoLocation()
        distance = geo.get_distance(
            profile.user.latitude,
            profile.user.longitude,
            user.latitude,
            user.longitude
        )

        profile.distance = round(distance)

        profile.images = profile.user.user_images.all(
        )[0:3].values_list('file_url', flat=True)

        return profile

    def accept_user(self, data, user):

        stranger = Stranger.objects.filter(user_id=data['user'].id).first()
        Prospect.objects.create(user, stranger, False)
        match = Prospect.objects.all().filter(
            denied=False).filter(stranger__user_id=user.id).filter(
            user_id=stranger.user_id).first()

        if match is not None:
            Prospect.objects.match_prospect(match.stranger.user,  match.user)
            Prospect.objects.match_prospect(
                match.user, match.stranger.user)

            match.user.images = match.user.user_images.all(
            )[0:3].values_list('file_url', flat=True)

            return match.user
        return None

    def deny_user(self, data, user):
        stranger = Stranger.objects.filter(user_id=data['user'].id).first()
        Prospect.objects.create(user, stranger, True)

    def create(self, user, seen: bool):
        stranger = self.model(
            user=user,
            seen=seen,
        )

        stranger.save()

    def __apply_extra_fields(self, strangers,  geo,  user):
        for stranger in strangers:
            stranger_longitude = '-' + stranger.user.longitude.replace('-', '')
            user_longitude = '-' + user.longitude.replace('-', '')
            distance = geo.get_distance(
                stranger.user.latitude,
                stranger_longitude,
                user.latitude,
                user_longitude
            )
            stranger.age = self.__get_age(stranger.user.dob)
            stranger.images = stranger.user.user_images.all(
            )[0:3].values_list('file_url', flat=True)

            stranger.distance = distance

    def __get_age(self, dob: str):
        format_str = '%m/%d/%Y'
        datetime_obj = datetime.datetime.strptime(dob, format_str)

        return datetime.datetime.now().year - datetime_obj.year

    def retrieve_stranger(self, user):

        Prospect.objects.reset(user)
        geo = GeoLocation()

        ids = Stranger.objects.all().filter(
            prospect_strangers__seen=True).filter(
            prospect_strangers__user_id=user.id).exclude(
            user_id=user.id).distinct().values_list('user_id', flat=True)

        strangers = Stranger.objects.all().exclude(
            user_id__in=ids).exclude(user_id=user.id)

        self.__apply_extra_fields(strangers, geo, user)

        strangers = [
            stranger for stranger in strangers
            if stranger.distance <= user.user_settings.distance_away
            and stranger.age <= user.user_settings.age
        ]
        strangers = [
            stranger for stranger in strangers
            if stranger.user.gender == user.user_settings.gender
        ]

        if len(strangers) == 0:
            raise NotFound(
                'No more users, try changing your location preferences.')

        return strangers[0]


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
