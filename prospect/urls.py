from django.urls import path
from prospect import views
urlpatterns = [
    path('prospects/', views.ListCreateAPIView.as_view()),
]
