# Generated by Django 4.1.3 on 2022-11-21 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0009_userimage_spot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userimage',
            name='spot',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]