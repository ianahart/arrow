from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(('authentication.urls', 'authentication'))),
    path('api/v1/', include(('account.urls', 'account'))),
    path('api/v1/', include(('match.urls', 'match'))),
    path('api/v1/', include(('stranger.urls', 'stranger'))),
    path('api/v1/', include(('prospect.urls', 'prospect'))),
]
