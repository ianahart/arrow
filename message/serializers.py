from rest_framework import serializers
from account.serializers import UserBasicSerializer
from message.models import Group, Message


class MessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('text', 'receiver', 'sender', 'group', )


class MessageSerializer(serializers.ModelSerializer):
    receiver = UserBasicSerializer()
    sender = UserBasicSerializer()

    class Meta:
        model = Message
        fields = ('receiver', 'sender', 'text', 'group',)


class GroupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group

        fields = ('user_one',  'user_two', )


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'user_one', 'user_two', )
