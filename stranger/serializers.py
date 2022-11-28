from rest_framework import serializers
from account.models import CustomUser
from account.serializers import UserSerializer, UserStrangerSerializer

from stranger.models import Stranger


class StrangerAcceptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stranger
        fields = ('user', )


class StrangerDenySerializer(serializers.ModelSerializer):

    class Meta:
        model = Stranger
        fields = ('user', )


class StrangerProspectSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Stranger
        fields = ('id',  'user', 'user_id',  'seen',)


class StrangerSerializer(serializers.ModelSerializer):
    user = UserStrangerSerializer()
    images = serializers.ListField()
    distance = serializers.IntegerField()

    class Meta:
        model = Stranger
        fields = ('id', 'seen', 'seen_by',
                  'user_id', 'images', 'user', 'distance', )
