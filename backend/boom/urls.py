from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet, SimilarPostsView

router = DefaultRouter()  # 이것은 viewset을 구성할때만 쓰는 방식이구나
router.register("posts", PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", CommentViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path(
        "api/posts/<int:post_pk>/similar",
        SimilarPostsView.as_view(),
        name="similar_posts",
    ),
]
