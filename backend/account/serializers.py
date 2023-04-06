from rest_framework import serializers
from django.contrib.auth import get_user_model
import re

User = get_user_model()


# class AvatarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()
#         fields = ["avatar_url"]


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True
    )  # 절대 db에서 그대로 읽어올 것이 아닌 쓰기 전용이라 명시
    avatar_url = serializers.CharField(read_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            nick_name=validated_data["nick_name"],
            email=validated_data["email"],
            avatar=validated_data.get("avatar", None),
        )  # FIXME: 여기서 이렇게 하나하나 지정하는 것보다 super().create로 할 방법이 없을까
        user.set_password(validated_data["password"])
        user.save()
        return user

    class Meta:
        model = User
        fields = [
            "pk",
            "username",
            "password",
            "nick_name",
            "email",
            "avatar",
            "avatar_url",
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField("avatar_url_field")

    # def avatar_url_field(self, author):
    #     if re.match(r"^https?://", author.avatar_url):  # 처음에 http로 시작한다면 그냥 반환한다는 조건!
    #         return author.avatar_url

    #     if "request" in self.context:
    #         scheme = self.context["request"].scheme  # http 또는 https를 리턴한다?
    #         host = self.context["request"].get_host()
    #         return scheme + "://" + host + author.avatar_url

    class Meta:
        model = User
        fields = "__all__"
