from django.urls import path
from stranger import views
urlpatterns = [
    path('strangers/', views.ListCreateAPIView.as_view()),
    path('strangers/deny/', views.DenyAPIView.as_view()),
    path('strangers/accept/', views.AcceptAPIView.as_view()),
]
