# Generated by Django 4.1.7 on 2023-03-16 12:58

import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0003_alter_user_password"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="nick_name",
            field=models.CharField(
                max_length=150,
                unique=True,
                validators=[django.contrib.auth.validators.UnicodeUsernameValidator()],
                verbose_name="닉네임",
            ),
        ),
    ]
