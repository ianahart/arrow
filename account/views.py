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

from authentication.serializers import LoginSerializer, RegisterSerializer

logger = logging.getLogger('django')


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
