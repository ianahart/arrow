from django.urls import path
from setting import views
urlpatterns = [
    path('settings/', views.ListCreateAPIView.as_view()),
    path('settings/<int:pk>/', views.DetailsAPIView.as_view()),
    path('settings/<int:pk>/preferences/', views.IncognitoAPIView.as_view()),
]
