from rest_framework import serializers

from account.models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('logged_in', 'avatar_url',
                  'latitude', 'longitude',
                  'created_at', 'location',
                  'first_name', 'gender',
                  'last_name', 'email',
                  'id',
                  )
