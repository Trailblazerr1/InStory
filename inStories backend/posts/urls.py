from django.urls import path
from .views import PostSotryView

urlpatterns = [
    path('story/', PostSotryView.as_view()),
]