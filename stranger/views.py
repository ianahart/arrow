from rest_framework.exceptions import ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
import logging


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):
    """
        A view for getting a users matches.
    """

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:
            return Response({
                'message': 'success',
            }, status=status.HTTP_200_OK)

        except ParseError:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)
