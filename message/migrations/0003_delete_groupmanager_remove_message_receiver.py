# Generated by Django 4.1.3 on 2022-12-02 19:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0002_groupmanager_group_message_group'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GroupManager',
        ),
        migrations.RemoveField(
            model_name='message',
            name='receiver',
        ),
    ]
