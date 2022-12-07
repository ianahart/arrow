from rest_framework import serializers

from setting.models import Setting


class SettingCreateSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField()

    class Meta:
        model = Setting
        fields = ('user', )


class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ('id', 'user', 'distance_away',
                  'min_age',  'max_age', 'gender', )


class SettingUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = ('distance_away', 'min_age', 'max_age', 'gender', )
