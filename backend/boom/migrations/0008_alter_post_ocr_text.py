# Generated by Django 4.1.7 on 2023-03-29 05:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("boom", "0007_post_ocr_text_alter_post_content"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="ocr_text",
            field=models.CharField(blank=True, max_length=2000, null=True),
        ),
    ]
