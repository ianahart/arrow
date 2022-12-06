from django.db import models
from django.db.models import Q
from django.utils import timezone
from datetime import datetime, timedelta
from django.core.paginator import Paginator


class ProspectManager(models.Manager):

    def retrieve_matches(self, user, page):
        matches = []
        objects = Prospect.objects.all().order_by('-id').filter(
            matched=True).filter(
            user_id=user.id)

        paginator = Paginator(objects, 1)
        next_page = int(page) + 1
        cur_page = paginator.page(next_page)
        object_list = cur_page.object_list

        for object in object_list:
            object.images = object.stranger.user.user_images.all(
            )[0:3].values_list('file_url', flat=True)
            matches.append(object)

        return {
            'has_next': cur_page.has_next(),
            'page': next_page,
            'matches':  matches
        }

    def match_prospect(self, user_one, user_two):
        match = Prospect.objects.all().filter(
            stranger__user_id=user_one).filter(user_id=user_two).first()
        match.matched = True
        match.save()

    def reset(self, user):
        Prospect.objects.all().filter(
            user_id=user.id).filter(
            created_at__lte=datetime.now(tz=timezone.utc) - timedelta(minutes=30)).filter(
            matched=False
        ).delete()

    def create(self, user, stranger, denied):
        prospect_user = self.model(
            user=user,
            seen=True,
            denied=denied,
            stranger=stranger,
        )

        prospect_user.save()

    def delete(self,  user_id: int, stranger_id: int):
        matches = Prospect.objects.all().filter(
            Q(stranger__user_id=stranger_id) & Q(user_id=user_id) |
            Q(stranger__user_id=user_id) & Q(user_id=stranger_id)
        )

        for match in matches:
            match.delete()


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
