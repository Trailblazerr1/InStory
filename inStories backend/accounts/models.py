from django.db import models
from django.contrib.auth.models import User


class InstagramAccount(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	

class InstagramAccountCredentials(models.Model):
	account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE)
	username = models.CharField(max_length=100)
	password = models.CharField(max_length=100)
