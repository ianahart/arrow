from rest_framework import serializers
from account.models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(
        error_messages={'blank': 'Confirm password may not be  blank.'})

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'password',
                  'email', 'gender', 'confirm_password',
                  )

        extra_kwargs = {
            "password": {"error_messages": {
                "blank": "Password may not be blank."}
            },
        }

    def validate_first_name(self, value):
        if len(value) == 0 or len(value) > 75:
            raise serializers.ValidationError(
                'First name must be at least 1 character and a maximum of 75 characters.')
        return value

    def validate_last_name(self, value):
        if len(value) == 0 or len(value) > 75:
            raise serializers.ValidationError(
                'First name must be at least 1 character and a maximum of 75 characters.')
        return value

    def validate_gender(self, value):
        excepted_values = ['man', 'woman', 'nonbinary']
        if value not in excepted_values:
            raise serializers.ValidationError(
                'Please select your gender.'
            )
        return value

    def validate_password(self, value):
        uppercase, digit, special_char = False, False, False
        for char in value:
            if char.isnumeric():
                digit = True
            if not char.isalnum():
                special_char = True
            if not char.isnumeric() and char.isalnum() and char.upper() == char:
                uppercase = True

        satisfied = all([uppercase, digit, special_char])

        if not satisfied:
            raise serializers.ValidationError(
                'Password must include 1 special, 1 digit, and 1 uppercase characters.')

        data = self.get_initial()
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords do not match.')
        return value

    def create(self, validated_data):
        include = ['first_name', 'last_name', 'gender']
        extra_fields = {key: val for key,
                        val in validated_data.items() if key in include}

        user = CustomUser.objects.user_by_email(
            email=[validated_data['email']])

        if user is not None:
            raise serializers.ValidationError(
                {'email': ['This email is already taken.']})

        CustomUser.objects.create(
            validated_data['email'],
            validated_data['password'],
            **extra_fields
        )
