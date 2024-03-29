# Generated by Django 4.1.7 on 2023-03-19 01:43

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("boom", "0004_alter_post_photo"),
    ]

    operations = [
        migrations.AddField(
            model_name="post",
            name="title",
            field=models.CharField(
                default=django.utils.timezone.now, max_length=1000, verbose_name="제목"
            ),
            preserve_default=False,
        ),
    ]
