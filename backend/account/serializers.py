from rest_framework import serializers
from django.contrib.auth import get_user_model

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
        avatar = validated_data.get("avatar", None)
        user = User.objects.create(
            username=validated_data["username"],
            nick_name=validated_data["nick_name"],
            email=validated_data["email"],
            avatar=avatar,
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
