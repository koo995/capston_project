from django.contrib.auth import get_user_model  # user모델이 바뀔수있으니 항상 이렇게?
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from .serializers import SignupSerializer, UserProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
import re


# from rest_framework.response import response


# Create your views here.
class SignupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SignupSerializer
    permission_classes = [
        AllowAny,  # 실제로 회원가입을 할때는 로그인이 될 수 없는 상황이니까
    ]


# 이 뷰는 인증이 되어있는 상태에 보여주는게 맞는거 같아. 그러니 요청을 보낼때 반드시 header에 token을 이용하도록
class UserProfileView(RetrieveAPIView):  # 이건 아직 내가 안만든 거임.
    queryset = get_user_model()
    serializer_class = UserProfileSerializer


@api_view(["GET"])
def get_user_info(request):
    # 보기 편하기 위해서 이렇게 했는데... 뭔가 거슬리네...
    def avatar_url_field(request, user):
        if re.match(r"^https?://", user.avatar_url):  # 처음에 http로 시작한다면 그냥 반환한다는 조건!
            return user.avatar_url

        else:
            scheme = request.scheme  # http 또는 https를 리턴한다?
            host = request.get_host()
            return scheme + "://" + host + user.avatar_url

    user = request.user
    avatar_url = avatar_url_field(request, user)

    user_info = {
        "username": user.username,
        "nick_name": user.nick_name,
        "avatar_url": avatar_url,
        # Add any other required fields
    }
    return Response(user_info)
