from rest_framework import serializers
from .models import Post, Tag
from django.contrib.auth import get_user_model


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["username", "avatar_url", "nick_name"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # 여기서 post 모델에 있는 tag_set을 새롭게 정의할때는 변수명을 똑같이 써줘야 작동하는구나!
    # read_only을 안하니까 api에서 입력을 받는구나, many=True을 안해놓으니 아무것도 안뜨네
    tag_set = TagSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ["author", "content", "photo", "caption", "tag_set"]
