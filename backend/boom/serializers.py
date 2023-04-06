from rest_framework import serializers
from .models import Post, Tag, Comment
from django.contrib.auth import get_user_model
import re


class AuthorSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    # 하드코딩을 방지하기 위해 이런 방법을 이용한다.
    # 현재 로그인유저를 판단해야 하는데 self.request.user은 view에서 쓰이는 것이다 여기는 serializers이니까 다른 방식을 써야한다
    # restframeworkapi문서를 보면 현재 로그인 유저를 알려면 context에 임의의 값을 넘겨준다? view 단에서 get_serializer_context을 오버라이딩 해준다
    def avatar_url_field(self, author):
        if re.match(r"^https?://", author.avatar_url):  # 처음에 http로 시작한다면 그냥 반환한다는 조건!
            return author.avatar_url

        if "request" in self.context:
            scheme = self.context["request"].scheme  # http 또는 https를 리턴한다?
            host = self.context["request"].get_host()
            return scheme + "://" + host + author.avatar_url

    class Meta:
        model = get_user_model()
        fields = ["username", "avatar_url", "nick_name"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class SimilarPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id"]


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    # 여기서 post 모델에 있는 tag_set을 새롭게 정의할때는 변수명을 똑같이 써줘야 작동하는구나!
    # read_only을 안하니까 api에서 입력을 받는구나, many=True을 안해놓으니 아무것도 안뜨네
    tag_set = TagSerializer(read_only=True, many=True)
    ocr_text = serializers.CharField(read_only=True)
    similar_post_set = SimilarPostSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = "__all__"  # 이렇게 해도 위에서 author이나 tag_set을 새롭게 정의한 대로 표현이 되는구나
        # fields = ["author", "title", "content", "photo", "caption", "tag_set", "id"]


class CommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "author", "content", "created_at"]
