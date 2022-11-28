from rest_framework.exceptions import NotFound, ParseError, ValidationError
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
import logging
from account.serializers import UserMatchSerializer

from stranger.models import Stranger
from stranger.serializers import StrangerDenySerializer, StrangerSerializer


logger = logging.getLogger('django')


class DetailsAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request,  pk: int):
        try:

            result = Stranger.objects.retrieve_profile(pk, request.user)

            serializer = StrangerSerializer(result)

            return Response({
                'message': 'success',
                'profile':  serializer.data
            }, status=status.HTTP_200_OK)

        except NotFound:
            return Response(
                {
                    'error': 'Could not load user\'s profile'
                }, status=status.HTTP_404_NOT_FOUND
            )


class AcceptAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:
            create_serializer = StrangerDenySerializer(data=request.data)
            create_serializer.is_valid(raise_exception=True)

            result = Stranger.objects.accept_user(
                create_serializer.validated_data, request.user
            )

            if result is not None:
                match = UserMatchSerializer(result)
                stranger = Stranger.objects.retrieve_stranger(request.user)

                if stranger is None:
                    raise NotFound('No more users. Try to adjust settings.')

                serializer = StrangerSerializer(stranger)

                return Response({
                    'message': 'success',
                    'match_preview': match.data,
                    'stranger': serializer.data,
                }, status=status.HTTP_200_OK)

            stranger = Stranger.objects.retrieve_stranger(request.user)

            if stranger is None:
                raise NotFound('No more users. Try to adjust settings.')

            serializer = StrangerSerializer(stranger)
            return Response({
                'message': 'success',
                'stranger': serializer.data,
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            return Response({
                'error': str(e.detail)
            }, status=status.HTTP_400_BAD_REQUEST)


class DenyAPIView(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:

            create_serializer = StrangerDenySerializer(data=request.data)
            create_serializer.is_valid(raise_exception=True)

            Stranger.objects.deny_user(
                create_serializer.validated_data, request.user)

            stranger = Stranger.objects.retrieve_stranger(request.user)

            if stranger is None:
                raise NotFound('No more users. Try to adjust settings.')

            serializer = StrangerSerializer(stranger)
            return Response({
                'message': 'success',
                'stranger': serializer.data,
            }, status=status.HTTP_200_OK)

        except ParseError as e:
            return Response({
                'error': str(e.detail)
            }, status=status.HTTP_400_BAD_REQUEST)


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
