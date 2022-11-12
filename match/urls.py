from django.urls import path
from match import views
urlpatterns = [
    path('matches/', views.ListCreateAPIView.as_view()),
]
