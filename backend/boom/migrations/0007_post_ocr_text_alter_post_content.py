# Generated by Django 4.1.7 on 2023-03-29 05:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("boom", "0006_alter_comment_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="post",
            name="ocr_text",
            field=models.CharField(blank=True, max_length=2000),
        ),
        migrations.AlterField(
            model_name="post",
            name="content",
            field=models.CharField(max_length=2000, verbose_name="내용"),
        ),
    ]
