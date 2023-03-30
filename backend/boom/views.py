from django.shortcuts import render, get_object_or_404
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework import mixins, generics
from rest_framework.response import Response
from .tasks import process_image_ocr_and_translation


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
        if post.photo:
            process_image_ocr_and_translation.delay(post.id)


class SimilarPostsView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        post_pk = self.kwargs["post_pk"]
        post = get_object_or_404(Post, pk=post_pk)
        return post.similar_post_set.all()


# 단순 apiview을 활용하는 방법
# class SimilarPostsView(APIView):
#     def get(self, request, post_pk):
#         post = get_object_or_404(Post, pk=post_pk)
#         similar_posts = post.similar_post_set.all()
#         serializer = PostSerializer(similar_posts, many=True, context={"request": request})
#         return Response(serializer.data)

# 함수형은 이렇게 하면 되는거 같은데 url.py에서 오류가 뜬다. 그래서 함수형으로 찾아봄
# @api_view(["GET"])
# def similar_posts(request, post_pk):
#     post = get_object_or_404(Post, pk=post_pk)
#     similar_posts = post.similar_post_set.all()
#     # serializer = PostSerializer(similar_posts, many=True, context={"request": request})
#     serializer = SimilarPostSerializer(similar_posts)
#     return Response(serializer.data)


class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # 여기서는 딱히 쓰이지는 않았지만 정의해두면 여러모로 좋을라나?
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)
