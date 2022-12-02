from django.db.models import Q
from django.db import DatabaseError, models
from django.utils import timezone
import logging
logger = logging.getLogger('django')


class MessageManager(models.Manager):
    def create(self, data):
        try:
            message = self.model(
                receiver=data['receiver'],
                sender=data['sender'],
                text=data['text'],
                group=data['group']
            )

            message.save()

            message.refresh_from_db()
            return message

        except DatabaseError:
            logger.error('Unable to create chat message.')

    def retreieve_messages(self, group):
        messages = Message.objects.order_by('-id').filter(
            group_id=group
        )[0:20]
        return messages


class GroupManager(models.Manager):
    def create(self, data):
        user_one, user_two = data.values()
        group_exists = Group.objects.filter(
            Q(user_one=user_one) & Q(user_two=user_two) |
            Q(user_one=user_two) & Q(user_two=user_one)
        ).first()

        if group_exists is None:
            group = self.model(
                user_one=user_one,
                user_two=user_two
            )
            group.save()
            group.refresh_from_db()
            return group
        else:
            return group_exists


class Group(models.Model):

    objects: GroupManager = GroupManager()

    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    user_one = models.ForeignKey(
        'account.CustomUser',
        related_name='group_user_one',
        on_delete=models.CASCADE,
    )
    user_two = models.ForeignKey(
        'account.CustomUser',
        related_name="group_two_user",
        on_delete=models.CASCADE,
    )


class Message(models.Model):

    objects: MessageManager = MessageManager()

    group = models.ForeignKey(
        'message.Group',
        related_name="group_messages",
        on_delete=models.CASCADE,
        blank=True,  null=True,

    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    text = models.CharField(max_length=200)
    receiver = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name="receiver",
        blank=True, null=True,

    )
    sender = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
        related_name="sender",
        blank=True, null=True,

    )
