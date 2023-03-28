from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, CommentViewSet

router = DefaultRouter()
router.register("posts", PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", CommentViewSet)


urlpatterns = [path("api/", include(router.urls))]
