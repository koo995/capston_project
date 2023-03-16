from django_pydenticon.views import image as pydenticon_image
from django.urls import path, include


urlpatterns = [
    path("identicon/image/<path:data>/", pydenticon_image, name="pydenticon_image"),
]
