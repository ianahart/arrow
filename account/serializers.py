from rest_framework import serializers

from account.models import CustomUser


class UserMatchSerializer(serializers.ModelSerializer):
    images = serializers.ListField()

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'id', 'images', )


class UserImageSerializer(serializers.Serializer):
    photo_one = serializers.ImageField(required=False)
    photo_two = serializers.ImageField(required=False)
    photo_three = serializers.ImageField(required=False)

    class Meta:
        fields = ('photo_one', 'photo_two', 'photo_three', )

    def validate_photo_one(self, photo):
        if (photo.size > 1500000):
            raise serializers.ValidationError('Photo must be under 1MB.')
        return photo

    def validate_photo_two(self, photo):
        if (photo.size > 1500000):
            raise serializers.ValidationError('Photo must be under 1MB.')
        return photo

    def validate_photo_three(self, photo):
        if (photo.size > 1500000):
            raise serializers.ValidationError('Photo must be under 1MB.')
        return photo


class UserUpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('interests', 'basics', 'bio', 'prompts')


class UserProfileSerializer(serializers.ModelSerializer):
    images = serializers.ListField()

    class Meta:
        model = CustomUser
        fields = ('images', 'interests', 'basics', 'bio', 'prompts')


class UserStrangerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('state', 'city', 'interests',
                  'basics', 'bio', 'prompts', 'dob',
                  'id', 'first_name', 'last_name',
                  )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('logged_in', 'avatar_url',
                  'latitude', 'longitude',
                  'created_at', 'city',
                  'first_name', 'gender',
                  'last_name', 'email',
                  'state',
                  'id',
                  )


class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'id',)
