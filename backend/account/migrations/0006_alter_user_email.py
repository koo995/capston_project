# Generated by Django 4.1.7 on 2023-03-17 02:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0005_alter_user_avatar"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(blank=True, max_length=254, verbose_name="이메일"),
        ),
    ]
