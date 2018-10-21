import io
import json
import requests
import uuid
from bs4 import BeautifulSoup
from goose3 import Goose
from PIL import Image

from django.db import models
from django.core.files.base import ContentFile
from django.conf import settings

from accounts.models import InstagramAccount


class MediaSource(models.Model):
	account = models.ForeignKey(InstagramAccount, on_delete=models.CASCADE, null=True)
	cached_properties = models.CharField(max_length=2000, null=True)

	class Meta:
		abstract = True

	@property
	def title(self):
		raise NotImplementedError

	@property
	def images(self):
		raise NotImplementedError

	@property
	def keywords(self):
		raise NotImplementedError

	@property
	def colors(self):
		raise NotImplementedError

	def get_properties(self):
		#caching
		if True and self.cached_properties:
			return json.loads(self.cached_properties)
		res = {}
		for prop in ['title', 'images', 'keywords', 'colors']:
			res[prop] = getattr(self, prop)
		self.cached_properties = json.dumps(res)
		self.save()
		return res


class ArtcileSource(MediaSource):
	url = models.URLField(max_length=500)

	_html = None
	@property
	def html(self):
		if not self._html:
			self._html = requests.get(self.url).text
		return self._html
	
	def _find_og(self, og):
		soup = BeautifulSoup(self.html, 'html.parser')
		try:
			return soup.find("meta", property="og:" + og)["content"]
		except KeyError:
			return None

	@property
	def title(self):
		return self._find_og('title')

	@property
	def description(self):
		return self._find_og('description')

	@property
	def article_content(self):
		g = Goose()
		article = g.extract(raw_html=self.html)
		return article.cleaned_text

	@property
	def images(self):
		qs = ArticleImage.objects.filter(article=self)
		if qs.count() < 1:
			soup_images = []
			for soup_img in BeautifulSoup(self.html, 'html.parser').find_all('img'):
				url = soup_img.get('data-src') or soup_img.get('src')
				# print(url)
				if url != None:
					i = ArticleImage(article=self, url=url)
					i.save()
			qs = ArticleImage.objects.filter(article=self)

		res = []
		for i in qs.order_by('-res'):
			url = '{}fetch-media-source/image/{}/'.format(settings.BASE_URL, i.uuid.hex)
			res.append({
				'url': url,
				'thumbnail_url': url + '?thumbnail=1',
				'width': i.width,
				'height': i.height,
				'top': 0,
				'left': i.offset_x,
			})
		# print (res)
		return res

	@property
	def keywords(self):
		url = 'https://language.googleapis.com/v1beta2/documents:analyzeEntities?key=AIzaSyCsYQaDpRixxBNYp3k-g9Nh-BCuAbqtv2M'
		data = {
			'encodingType' :'UTF32',
			'document': {
				'type': 'HTML',
				'content': str(self.article_content),
			},
		}
		resp = requests.post(url, data=json.dumps(data)).json()
		keywords = []
		for entity in resp['entities']:
			if len(entity['name']) > 35 or len(entity['name'].split(' ')) > 3:
				continue
			keywords.append({
				'name': entity['name'].replace(' ', ''),
				'salience': entity['salience'],
			})



		url2 = 'https://language.googleapis.com/v1beta2/documents:classifyText?key=AIzaSyCsYQaDpRixxBNYp3k-g9Nh-BCuAbqtv2M'
		data = {
			'document': {
				'type': 'HTML',
				'content': str(self.article_content),
			},
		}
		resp = requests.post(url2, data=json.dumps(data)).json()
		if resp['categories']==[]:
			return ['Insta']
		else:
			for keyword in resp['categories'][0]['name'].split('/')[1:]:
				keywords.append({'name': keyword.lower(), 'salience': 100})
			keywords = sorted(keywords, key=lambda k: -k['salience'])
			return [d['name'] for d in keywords][:20]

	@property
	def colors(self):
		image = ArticleImage.objects.filter(article=self).order_by('-res').first()
		api_key = 'acc_2759e045a6b1157'
		api_secret = '35c33d7b2745f6416f2f0b4cf274042a'
		response = requests.get('https://api.imagga.com/v1/colors?url={}'.format(image.url), auth=(api_key, api_secret)).json()
		colors = response['results'][0]['info']['background_colors']
		return [colors[0]['html_code'], colors[1]['html_code']]


class ArticleImage(models.Model):
	uuid = models.UUIDField()
	article = models.ForeignKey(ArtcileSource, on_delete=models.CASCADE)
	url = models.URLField(max_length=500)
	file = models.FileField(null=True)
	res = models.IntegerField(null=True)
	width = models.IntegerField(null=True)
	height = models.IntegerField(null=True)
	offset_x = models.IntegerField(null=True)
	thumbnail_file = models.FileField(null=True)

	def save(self, *args, **kwargs):
		if not self.file:
			self.uuid = uuid.uuid4()
			image_data = requests.get(self.url).content
			# print (image_data)
			image = Image.open(io.BytesIO(image_data))
			f = io.BytesIO()
			image.save(f, format='png')
			self.file.save(self.uuid.hex + '_full.png', ContentFile(f.getvalue()), save=False)
			width, height = image.size
			self.res = width * height
			if self.res < 600*600:
				return
			self.width = width
			self.height = height

			api_key = 'acc_2759e045a6b1157'
			api_secret = '35c33d7b2745f6416f2f0b4cf274042a'
			h = self.height
			w = int(h * 0.5625)
			response = requests.get('https://api.imagga.com/v1/croppings?url={}&no_scaling=1&resolution={}x{}'.format(self.url, w, h), auth=(api_key, api_secret)).json()
			self.offset_x = response['results'][0]['croppings'][0]['x1']

			# response = requests.get('https://api.imagga.com/v1/croppings?url={}&resolution={}x{}'.format(self.url, 145, 236), auth=(api_key, api_secret)).json()
			# preview_crop = response['results'][0]['croppings'][0]
			# print(preview_crop)
			# image = image.crop((preview_crop['x1'], preview_crop['y1'], preview_crop['x2'], preview_crop['y2']))
			image = image.crop((self.offset_x, 0, self.offset_x + w, h))
			# image = image.resize((145, 236), Image.ANTIALIAS)
			f = io.BytesIO()
			image.save(f, format='png')
			self.thumbnail_file.save(self.uuid.hex + '_thumbnail.png', ContentFile(f.getvalue()), save=False)
			super().save(*args, **kwargs)
