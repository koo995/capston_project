from django.contrib import admin
from .models import Post, Tag, Comment
from django.utils.safestring import mark_safe


# Register your models here.
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["author", "photo_thumbnail", "content"]
    list_display_links = ["content"]

    def photo_thumbnail(self, post):
        return mark_safe(f"<img src={post.photo.url} style='width:100px;' />")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    pass


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    pass
