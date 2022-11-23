from rest_framework import serializers
from account.serializers import UserStrangerSerializer

from stranger.models import Stranger


class StrangerSerializer(serializers.ModelSerializer):
    user = UserStrangerSerializer()
    images = serializers.ListField()

    class Meta:
        model = Stranger
        fields = ('id', 'seen', 'seen_by', 'user_id', 'images', 'user', )
