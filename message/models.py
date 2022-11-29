from django.db import models
from django.utils import timezone


class MessageManager(models.Manager):
    def create(self):
        pass


class Message(models.Model):

    objects: MessageManager = MessageManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    text = models.CharField(max_length=200)
    receiver = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name="receiver"
    )
    sender = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name="sender"
    )
