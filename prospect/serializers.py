from rest_framework import serializers
from account.serializers import UserSerializer

from prospect.models import Prospect
from stranger.serializers import StrangerProspectSerializer


class ProspectSerializer(serializers.ModelSerializer):

    images = serializers.ListField()
    stranger = StrangerProspectSerializer()

    class Meta:
        model = Prospect
        fields = ('id', 'images', 'stranger',)
