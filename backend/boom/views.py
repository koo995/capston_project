from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response


# Create your views here.
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)  # 이 필드가 필수인데 안 넣어줘서 그랬구나...
        # save()로 인스턴스를 생성한 것임.
        tag_list = post.extract_tag_list()
        post.tag_set.add(*tag_list)
        post.save()
