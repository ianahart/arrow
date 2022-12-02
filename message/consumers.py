import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from message.models import Message

from message.serializers import MessageCreateSerializer, MessageSerializer

# pyright: reportOptionalMemberAccess=false


class MessageConsumer(AsyncWebsocketConsumer):
    def send_message(self, data):
        message_data = {
            'text':  data['text'],
            'group': data['group'],
            'sender':   data['sender']['id'],
            'receiver': data['receiver']['id'],
        }

        create_serializer = MessageCreateSerializer(
            data=message_data)  # type:ignore
        create_serializer.is_valid()
        message = Message.objects.create(create_serializer.validated_data)
        message = MessageSerializer(message)

        return message.data

    async def connect(self):
        print('------------CONNECTED--------------')
        self.room_name = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'chat_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = await database_sync_to_async(self.send_message)(text_data_json)
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )

        await self.channel_layer.group_send(
            'chat_' + str(message['receiver']['id']),  {
                "type": 'chat_message', 'message': message}
        )

    async def chat_message(self, event):
        message = event["message"]

        await self.send(text_data=json.dumps({"message": message}))
