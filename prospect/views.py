from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from prospect.serializers import ProspectSerializer

from .models import Prospect


logger = logging.getLogger('django')


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            matches = Prospect.objects.retrieve_matches(request.user)
            serializer = ProspectSerializer(matches,  many=True)
            return Response({
                'message': 'success',
                'matches': serializer.data,
            }, status=status.HTTP_200_OK)

        except NotFound:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)
