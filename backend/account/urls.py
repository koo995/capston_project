from django_pydenticon.views import image as pydenticon_image
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views


urlpatterns = [
    path("identicon/image/<path:data>.png", pydenticon_image, name="pydenticon_image"),
    path("signup/", views.SignupView.as_view(), name="login"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
