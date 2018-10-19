import requests
from bs4 import BeautifulSoup
from goose3 import Goose
from PIL import Image
import io
import shutil
import json

def editImg(url):
    #url='https://subscription-assets.timeinc.com/current/8423_top1_205_thumb.jpg'
    image_name= url.split("/")[-1]
    #image_name= url.split("?")[0]
    r = requests.get(url)
    i = Image.open(io.BytesIO(r.content))
    #i.save(image_name)
    width, height = i.size
    res = width * height
    #if res < 600*600:
        #return
    api_key = 'acc_e02152da44b1cf4'
    api_secret = '622e361430a2b9beb2a02509e907d3c5'
    h = height
    w = int(h * 0.5625)
    print(w,h)
    response = requests.get('https://api.imagga.com/v1/croppings?url={}&no_scaling=1&resolution={}x{}'.format(url, w, h), auth=(api_key, api_secret)).json()
    offset_x = response['results'][0]['croppings'][0]['x1']
    image = i.crop((offset_x, 0, offset_x + w, h))
    if not image_name.endswith('g'):
        image_name= image_name.split("?")[0]
    image.save("cropped "+ image_name)





url='https://www.travelandleisure.com/holiday-travel/thanksgiving-travel-2017'
#TEXT PART
htm = requests.get(url).text
soup = BeautifulSoup(htm, 'html.parser')
#title = soup.find("meta", property="og:title")["content"]
#body = soup.find("meta", property="og:description")["content"]
g = Goose()
article = g.extract(url=url)
#print(article.title)
#print(article.meta_description)
#print(article.cleaned_text)
#print(article.top_image.src)

#IMAGE PART
urls=[]
for img in soup.find_all('img'):
    url = img.get('data-src') or img.get('src')
    if url != None and url.startswith('http'):
        urls.append(url)

for u in urls:
	editImg(u)


#HASHTAGS
url2 = 'https://language.googleapis.com/v1beta2/documents:analyzeEntities?key=AIzaSyCsYQaDpRixxBNYp3k-g9Nh-BCuAbqtv2M'
data = {
                'encodingType' :'UTF32',
                    'document': {
                        'type': 'HTML',
                            'content': str(article.cleaned_text),
                            },
            }
resp = requests.post(url2, data=json.dumps(data)).json()
keywords = []
for entity in resp['entities']:
    if len(entity['name']) > 35 or len(entity['name'].split(' ')) > 3:
        continue
    keywords.append({'name': entity['name'].replace(' ', ''),'salience': entity['salience'],})
#print(keywords)

url3 = 'https://language.googleapis.com/v1beta2/documents:classifyText?key=AIzaSyCsYQaDpRixxBNYp3k-g9Nh-BCuAbqtv2M'
data = {
                'document': {
                        'type': 'HTML',
                            'content': str(article.cleaned_text),
                            },
            }
resp = requests.post(url3, data=json.dumps(data)).json()
for keyword in resp['categories'][0]['name'].split('/')[1:]:
    keywords.append({'name': keyword.lower(), 'salience': 100})
keywords = sorted(keywords, key=lambda k: -k['salience'])
out=[d['name'] for d in keywords][:10]
print(out)


image = 'https://subscription-assets.timeinc.com/current/8423_top1_205_thumb.jpg'
api_key = 'acc_2759e045a6b1157'
api_secret = '35c33d7b2745f6416f2f0b4cf274042a'
response = requests.get('https://api.imagga.com/v1/colors?url={}'.format(image), auth=(api_key, api_secret)).json()
colors = response['results'][0]['info']['background_colors']
# col = [colors[0]['html_code'], colors[1]['html_code']]
# print(col)


172.20.53.108
