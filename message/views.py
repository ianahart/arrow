from rest_framework.exceptions import ParseError, ValidationError
from django.core.exceptions import BadRequest, ObjectDoesNotExist
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from message.models import Message, Group
import logging

from message.serializers import MessageSerializer, GroupCreateSerializer, GroupSerializer
logger = logging.getLogger('django')


class GroupListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def post(self, request):
        try:

            create_serializer = GroupCreateSerializer(data=request.data)
            create_serializer.is_valid()

            result = Group.objects.create(create_serializer.validated_data)
            serializer = GroupSerializer(result)

            return Response({
                'message': 'success',
                'group': serializer.data,
            }, status=status.HTTP_200_OK)

        except ParseError:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)


class ListCreateAPIView(APIView):

    permission_classes = [IsAuthenticated, ]

    def get(self, request):
        try:

            receiver, sender,  group = request.query_params.values()

            result = Message.objects.retreieve_messages(group)

            messages = MessageSerializer(result, many=True)

            return Response({
                'message': 'success',
                'messages': messages.data,
            }, status=status.HTTP_200_OK)

        except ParseError:
            return Response({
                'error': 'No matches found'
            }, status=status.HTTP_404_NOT_FOUND)
