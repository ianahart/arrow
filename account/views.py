from rest_framework.exceptions import ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from account.models import CustomUser, UserImage
import json
import logging
from account.serializers import UserImageSerializer, UserProfileSerializer, UserSerializer

from authentication.serializers import LoginSerializer, RegisterSerializer

logger = logging.getLogger('django')


class DetailsAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def patch(self, request, pk: int):
        try:

            serializer = UserProfileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            photos = {
                key: value for key,
                value in request.data.items() if 'photo' in key}

            photo_serializer = UserImageSerializer(
                data=photos)  # type: ignore
            photo_serializer.is_valid(raise_exception=True)

            CustomUser.objects.update_profile(
                serializer.validated_data,
                pk,
            )

            user = CustomUser.objects.get(pk=pk)
            for photo in photo_serializer.validated_data.values():  # type:ignore
                UserImage.objects.create(photo, user)

            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except ParseError:
            return Response({
                'error': 'parse error'
            }, status=status.HTTP_400_BAD_REQUEST)


class RefreshUserAPIView(APIView):
    """
       A View for refreshing a user.
    """
    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            authorization = request.headers['authorization']

            result = CustomUser.objects.refresh_user(
                request.user, authorization)

            serializer = UserSerializer(result)

            return Response({
                'user': serializer.data,
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
