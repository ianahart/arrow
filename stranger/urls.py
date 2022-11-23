from django.urls import path
from stranger import views
urlpatterns = [
    path('strangers/', views.ListCreateAPIView.as_view()),
]
