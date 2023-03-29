# tasks.py
from celery import shared_task
from .models import Post
from module.API import detect_text, translate_text
from module.utils import find_similar_posts


@shared_task
def process_image_ocr_and_translation(post_id):
    post = Post.objects.get(pk=post_id)
    post.photo.file.open()
    image_path = post.photo.path
    detected_text, language = detect_text(image_path)
    translated_text = translate_text(detected_text, language)
    post.ocr_text = translated_text
    post.save()
    # check similarity
    similar_posts = find_similar_posts(post)
    print(f"Similar posts found: {len(similar_posts)}")
    for similar_post in similar_posts:
        print(
            f" - Similar post ID: {similar_post.pk}, OCR Text: {similar_post.ocr_text}"
        )
