# Generated by Django 4.1.7 on 2023-03-16 12:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="user",
            old_name="created_at",
            new_name="date_joined",
        ),
        migrations.AlterField(
            model_name="user",
            name="avatar",
            field=models.ImageField(blank=True, upload_to="account/avatar/%Y/%m/%d"),
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                blank=True, max_length=254, unique=True, verbose_name="이메일"
            ),
        ),
    ]
