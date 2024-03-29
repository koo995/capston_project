from django.shortcuts import render, get_object_or_404
from .models import Post, Comment, Tag
from django.db.models import Q, Count
from .serializers import (
    PostSerializer,
    CommentSerializer,
    TagSerializer,
    SimilarPostSerializer,
)
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework import mixins, generics
from rest_framework.response import Response
from rest_framework import filters
from .tasks import process_image_ocr_and_translation


# Create your views here.
class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "content", "ocr_text"]

    def get_serializer_context(self):
        context = super().get_serializer_context()  # 부모값을 받아오고
        context["request"] = self.request  # 내가 원하는 값으로 담아서 넘겨준다.
        return context

    # 이 부분으로 처리함으로써 밑에 있는 TaggedPostsView은 쓸모가 없어졌다
    def get_queryset(self):
        tags = self.request.query_params.get("tags", None)
        qs = self.request.query_params.get("q", None)
        queryset = (
            Post.objects.all()
            .annotate(comment_count=Count("comment"))
            .order_by("-created_at")  # 최신순으로 하기 위해서 - 을 붙여준다
        )  # annotate을 여기다 정의해야 하는군
        if tags:
            tag_list = tags.split(",")
            query_tag = Q()
            for tag in tag_list:
                query_tag |= Q(tag_set__name=tag)  # |=이 연산자에 대해서 몰랐네 or조건의 연쇄인가
            queryset = queryset.filter(query_tag).distinct()
        return queryset

    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user)  # 이 필드가 필수인데 안 넣어줘서 그랬구나...
        # save()로 인스턴스를 생성한 것임.
        tag_list = post.extract_tag_list()
        post.tag_set.add(*tag_list)
        if post.photo:
            process_image_ocr_and_translation.delay(post.id)


class SimilarPostsView(generics.ListAPIView):
    serializer_class = SimilarPostSerializer
    permission_classes = [AllowAny]

    # 이 녀석도 쓰이니까 지정해 준다.
    def get_serializer_context(self):
        context = super().get_serializer_context()  # 부모값을 받아오고
        context["request"] = self.request  # 내가 원하는 값으로 담아서 넘겨준다.
        return context

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
        context = super().get_serializer_context()  # 부모값을 받아오고
        context["request"] = self.request  # 내가 원하는 값으로 담아서 넘겨준다.
        return context

    def get_queryset(self):
        qs = super().get_queryset()
        qs = qs.filter(post__pk=self.kwargs["post_pk"])
        return qs

    def perform_create(self, serializer):
        post = get_object_or_404(Post, pk=self.kwargs["post_pk"])
        serializer.save(author=self.request.user, post=post)
        return super().perform_create(serializer)


class TagsListView(generics.ListAPIView):
    serializer_class = TagSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Tag.objects.all()


# class TaggedPostsView(generics.ListAPIView):
#     serializer_class = PostSerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         tag_name = self.kwargs["tag_name"]
#         tag = get_object_or_404(Tag, name=tag_name)
#         return tag.post_set.all()
