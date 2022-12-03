from rest_framework.exceptions import NotFound, ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import logging

from prospect.serializers import ProspectSerializer

from .models import Prospect
from stranger.models import Stranger

logger = logging.getLogger('django')


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            page = request.query_params['page']
            result = Prospect.objects.retrieve_matches(request.user, page)

            serializer = ProspectSerializer(result['matches'],  many=True)
            return Response({
                'message': 'success',
                'matches': serializer.data,
                'has_next': result['has_next'],
                'page':  result['page'],
            }, status=status.HTTP_200_OK)

        except NotFound:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)


class DetailsAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def delete(self, request, pk: int):
        try:
            prospect = Stranger.objects.filter(user_id=pk).first()
            self.check_object_permissions(request, prospect.user)

            Prospect.objects.delete(request.user.id, pk)
            return Response({
                'message': 'success'
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            return Response({
                'error': str(e.detail)
            },  status=status.HTTP_400_BAD_REQUEST)
