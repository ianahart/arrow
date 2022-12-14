from rest_framework.exceptions import ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from account.models import CustomUser
import json
import logging
from account.serializers import UserSerializer
from authentication.models import PasswordReset

from authentication.serializers import ForgotPasswordSerializer, LoginSerializer, LogoutSerializer, PasswordResetSerializer, RegisterSerializer

logger = logging.getLogger('django')


class PasswordResetAPIView(APIView):
    permission_classes = [AllowAny, ]

    def patch(self, request, pk: int):

        try:
            serializer = PasswordResetSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            result = PasswordReset.objects.reset_password(
                serializer.validated_data, pk)
            if result['type'] == 'error':
                raise ParseError(result['error'])

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except ParseError as e:
            return Response({
                'error':  e.detail,
            }, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordAPIView(APIView):
    """
        A view for sending a password reset email.
    """
    permission_classes = [AllowAny, ]

    def post(self, request):
        try:
            serializer = ForgotPasswordSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            data = CustomUser.objects.send_forgot_email(
                request.user.id, serializer.validated_data)

            if data['type'] == 'error':
                raise ObjectDoesNotExist(data['data'])

            user = CustomUser.objects.get(
                pk=data['data']['uid'])  # type:ignore
            PasswordReset.objects.create(data, user)

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except (BadRequest, ObjectDoesNotExist, ) as e:
            return Response({
                'errors': {'email': [str(e)]},
            }, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    """
        A view for logging a user out of the application.
    """

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            serializer = LogoutSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            CustomUser.objects.logout(
                request.user.id, serializer.validated_data['refresh_token'])  # pyright: ignore
            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except ParseError:
            return Response({
                'error': 'Unable to log you out at this time.'
            }, status=status.HTTP_400_BAD_REQUEST)


class RegisterAPIView(APIView):
    """
       A View for creating/registering a user.
    """
    permission_classes = [AllowAny, ]

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            serializer.create(serializer.validated_data)

            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({
                'errors': e.detail
            }, status=status.HTTP_400_BAD_REQUEST)


class TokenObtainPairView(APIView):
    """
        A view for Logging a user in.
    """

    def post(self, request):
        try:

            login_serializer = LoginSerializer(data=request.data)
            login_serializer.is_valid(raise_exception=True)

            result = CustomUser.objects.login(
                login_serializer.validated_data)  # type: ignore

            if result['type'] == 'error':
                raise ParseError(result['data'])

            user_serializer = UserSerializer(result['data']['user'])

            return Response({
                'message': 'success',
                'tokens': result['data']['tokens'],
                'user': user_serializer.data,
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            print(e)
            return Response({
                'email': [e.detail]
            }, status=status.HTTP_400_BAD_REQUEST)
