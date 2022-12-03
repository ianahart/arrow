from django.urls import path
from prospect import views
urlpatterns = [
    path('prospects/', views.ListCreateAPIView.as_view()),
    path('prospects/<int:pk>/', views.DetailsAPIView.as_view()),
]
