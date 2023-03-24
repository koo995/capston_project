from django.contrib import admin
from .models import User

# Register your models here.
# admin.site.register(User)


# 위에 방식으로 해도 되지만 이렇게 하면 좀더 커스텀하기에 좋다
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "nick_name", "avatar_url"]
    list_display_links = ["username"]
