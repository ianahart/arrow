from django.urls import path
from authentication import views
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('auth/signup/', views.RegisterAPIView.as_view()),
    path('auth/signin/', views.TokenObtainPairView.as_view()),
    path('auth/signout/', views.LogoutAPIView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('auth/forgot-password/', views.ForgotPasswordAPIView.as_view()),
    path('auth/reset-password/<int:pk>/', views.PasswordResetAPIView.as_view()),
]
