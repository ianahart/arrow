from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
import logging

from stranger.models import Stranger
from stranger.serializers import StrangerSerializer


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):
    """
        A view for getting a users matches.
    """

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            stranger = Stranger.objects.retrieve_stranger(request.user)

            if stranger is None:
                raise NotFound('No more users. Try to adjust settings.')

            serializer = StrangerSerializer(stranger)
            return Response({
                'message': 'success',
                'stranger': serializer.data,
            }, status=status.HTTP_200_OK)

        except NotFound:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)
