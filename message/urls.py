from django.urls import path
from message import views
urlpatterns = [
    path('messages/', views.ListCreateAPIView.as_view()),
    path('groups/', views.GroupListCreateAPIView.as_view()),
]
