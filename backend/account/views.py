from django.contrib.auth import get_user_model  # user모델이 바뀔수있으니 항상 이렇게?
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer
from rest_framework.decorators import api_view

# from rest_framework.response import response


# Create your views here.
class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,  # 실제로 회원가입을 할때는 로그인이 될 수 없는 상황이니까
    ]
