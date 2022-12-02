from django.contrib import admin

from message.models import Message,  Group

admin.site.register(Message)
admin.site.register(Group)
