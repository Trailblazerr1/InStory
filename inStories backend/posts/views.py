import io
import requests
from PIL import Image, ImageDraw, ImageFont

from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class PostSotryView(APIView):
	def post(self, request):
		image = Image.open(io.BytesIO(request.body))
		image = image.convert('RGB')
		w, h = image.size
		image = image.crop((0, 0, 375, h))
		f = open('../php-app/post.jpg', 'w')
		image.save(f, 'JPEG', quality=95)

		from subprocess import call
		path = settings.BASE_DIR + '/../php-app'
		call("php story_upload.php",cwd=path,shell=True)

		r = Response({}, status=status.HTTP_201_CREATED)
		r['Access-Control-Allow-Origin'] = '*'
		return r

	# :( sad
	def options(self, request):
		r = HttpResponse({}, status=status.HTTP_201_CREATED)
		r['Access-Control-Allow-Origin'] = request.META.get('HTTP_ORIGIN')
		r['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
		r['Access-Control-Max-Age'] = '604800'
		r['Access-Control-Allow-Headers'] = 'x-requested-with, Content-Type'
		return r