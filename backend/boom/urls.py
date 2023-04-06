from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet,
    CommentViewSet,
    SimilarPostsView,
    # TaggedPostsView,
    TagsListView,
)

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", CommentViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path(
        "api/posts/<int:post_pk>/similar/",
        SimilarPostsView.as_view(),
        name="similar_posts",
    ),
    path("api/tags/", TagsListView.as_view(), name="Tag"),
    # path(
    #     "api/tags/<str:tag_name>/posts/",
    #     TaggedPostsView.as_view(),
    #     name="tagged_posts",
    # ),
]
