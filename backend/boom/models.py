from django.db import models
from django.conf import settings
from django.urls import reverse
from django.shortcuts import resolve_url
import re
import time

# Create your models here.


class TimeStampedModel(
    models.Model
):  # 매번 모델들에 똑같은 필드를 넣는것이 번거롭다면 공통이 되는 필드를 가진 부모클래스를 만들어서 상속받도록해줌
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # 부모로써만 존재하고 따로 데이터테이블은 만들어지지 않는다. 따로 생성이 안된다.


# user
#  -> Post.objects.filter(author=user)
#  -> user.post_set.all()
class Post(TimeStampedModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name="작성자",
        related_name="my_post_set",  # 여기서 like_user_set의 related_name과 충돌이 일어날수있으니까 변경해 준다. user.my_post_set을 이용해서 뽑아낼 수 있다.
        on_delete=models.CASCADE,
    )
    photo = models.ImageField(upload_to="instagram/post/%Y/%m/%d", blank=True)
    title = models.CharField(verbose_name="제목", max_length=1000)
    content = models.CharField(verbose_name="내용", max_length=2000)
    caption = models.CharField(verbose_name="태그", max_length=1000)
    ocr_text = models.CharField(blank=True, null=True, max_length=2000)
    tag_set = models.ManyToManyField("Tag", blank=True)
    similar_post_set = models.ManyToManyField("self", blank=True)

    def __str__(self):
        return self.content

    # 이걸 활용할 방안은 없는걸까
    def get_absolute_url(self):
        return reverse("boom:post_detail", kwargs={"pk": self.pk})

    def extract_tag_list(self):
        tag_name_list = re.findall(r"#([a-zA-Z\dㄱ-힣]+)", self.caption)
        tag_list = []
        for tag_name in tag_name_list:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            tag_list.append(tag)
        return tag_list

    class Meta:
        ordering = ["-id"]


class Comment(TimeStampedModel):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        verbose_name="작성자",
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField("내용")

    # 답변은 늦게 달린게 뒤에 있는게 좋으니 이렇게 하자
    # class Meta:
    #     ordering = ["-id"]


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
