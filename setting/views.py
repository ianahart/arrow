from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging
from account.models import CustomUser
from account.permissions import AccountPermission
from setting.serializers import SettingCreateSerializer, SettingSerializer, SettingUpdateSerializer
from .models import Setting


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            serializer = None
            create_serializer = SettingCreateSerializer(data=request.data)
            create_serializer.is_valid(raise_exception=True)
            user = CustomUser.objects.all().filter(
                id=create_serializer.validated_data['user']).first()  # type:ignore

            user_setting = Setting.objects.retrieve(
                user)

            if user_setting is not None:
                serializer = SettingSerializer(user_setting)
            else:
                user_setting = Setting.objects.create(user)
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
