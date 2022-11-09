from django.urls import path
from account import views
urlpatterns = [
    path('account/refresh/', views.RefreshUserAPIView.as_view()),
]
