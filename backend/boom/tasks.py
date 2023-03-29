# tasks.py
from celery import shared_task
from .models import Post
from module.API import detect_text, translate_text


@shared_task
def process_image_ocr_and_translation(post_id):
    post = Post.objects.get(pk=post_id)
    post.photo.file.open()
    image_path = post.photo.path
    detected_text = detect_text(image_path)
    translated_text = translate_text(detected_text)
    print("translated_text: ", translated_text)
    print("post.ocr_text1: ", post.ocr_text)
    post.ocr_text = translated_text
    print("post.ocr_text2: ", post.ocr_text)
    post.save()
