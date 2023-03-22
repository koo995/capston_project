from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.shortcuts import resolve_url


class User(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        "아이디",
        max_length=10,
        unique=True,
        validators=[username_validator],
    )
    password = models.CharField("비밀번호", max_length=128)
    nick_name = models.CharField("닉네임", max_length=150, unique=True)
    email = models.EmailField("이메일", blank=True)
    is_staff = models.BooleanField("스태프 권한", default=False)
    is_active = models.BooleanField("사용여부", default=True)
    date_joined = models.DateTimeField("가입일", auto_now_add=True)
    avatar = models.ImageField("아바타", upload_to="account/avatar/%Y/%m/%d", blank=True)
    objects = UserManager()

    USERNAME_FIELD = "username"  # 아이디를 사용자 식별자로 설정
    REQUIRED_FIELDS = ["nick_name"]  # 필수입력값

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.nick_name)
