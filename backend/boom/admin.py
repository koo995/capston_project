from django.contrib import admin
from .models import Post, Tag, Comment
from django.utils.safestring import mark_safe


# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["id", "author", "photo_thumbnail", "title", "content", "ocr_text"]
    list_display_links = ["title"]

    def photo_thumbnail(self, post):
        if post.photo:
            return mark_safe(f"<img src={post.photo.url} style='width:100px;' />")
        else:
            return "사진없음"


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
