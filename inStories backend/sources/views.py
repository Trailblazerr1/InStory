from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ArtcileSource, ArticleImage



class FetchArticleView(APIView):
	def get(self, request):
		article_url = request.GET.get('url', None)
		try:
			article = ArtcileSource.objects.get(url=article_url)
		except ArtcileSource.DoesNotExist:
			article = ArtcileSource.objects.create(url=article_url)
		r = Response(article.get_properties(), 200)
		r['Access-Control-Allow-Origin'] = '*'
		return r


class ImageView(APIView):
	def get(self, request, *args, **kwargs):
		i = ArticleImage.objects.get(uuid=kwargs['uuid'])
		if request.GET.get('thumbnail', False):
			body = i.thumbnail_file.read()
		else:
			body = i.file.read()
		r = HttpResponse(body)
		r['Access-Control-Allow-Origin'] = '*'
		r['Content-Type'] = 'image/png'
		return r