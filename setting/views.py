from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging
from account.models import CustomUser
from account.permissions import AccountPermission
from setting.serializers import SettingCreateSerializer, SettingIncognitoSerializer, SettingSerializer, SettingUpdateSerializer
from .models import Setting


logger = logging.getLogger('django')


class IncognitoAPIView(APIView):
    permission_classes = [IsAuthenticated, AccountPermission, ]

    def patch(self, request, pk: int):
        try:
            setting = Setting.objects.get(pk=pk)
            self.check_object_permissions(request, setting.user)

            serializer = SettingIncognitoSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            Setting.objects.toggle_incognito(serializer.validated_data, pk)

            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            return Response({
                'error':  str(e.detail)
            },  status=status.HTTP_400_BAD_REQUEST)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            user = CustomUser.objects.get(pk=request.query_params['id'])

            user_setting = Setting.objects.retrieve(
                user)

            serializer = SettingSerializer(user_setting)

            return Response({
                'message': 'success',
                'settings': serializer.data,
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            print(e)
            return Response({
                'error': str(e.detail),
            }, status=status.HTTP_400_BAD_REQUEST)


class DetailsAPIView(APIView):
    permission_classes = [IsAuthenticated, AccountPermission, ]

    def patch(self, request, pk: int):
        try:

            setting = Setting.objects.get(pk=pk)
            self.check_object_permissions(request, setting.user)

            serializer = SettingUpdateSerializer(data=request.data['form'])
            serializer.is_valid(raise_exception=True)

            Setting.objects.update(serializer.validated_data, pk)

            return Response({
                'message':  'success',
            }, status=status.HTTP_200_OK)
        except ParseError as e:
            return Response({
                'error':  str(e.detail),
            }, status=status.HTTP_400_BAD_REQUEST)
