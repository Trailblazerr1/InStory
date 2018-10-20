from django.urls import path
from .views import FetchArticleView, ImageView

urlpatterns = [
    path('article/', FetchArticleView.as_view()),
    path('image/<str:uuid>/', ImageView.as_view()),
]