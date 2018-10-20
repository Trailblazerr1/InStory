from django.db import models

from accounts import InstagramAccount


class Post(models.Model):
	account = models.ForeignKey(InstagramAccount)


class InstagramPost(models.Model):
	post = models.ForeignKey(Post)