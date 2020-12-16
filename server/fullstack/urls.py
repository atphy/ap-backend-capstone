from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from fullstackapi.views import register_user, login_user, Shops, Records

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'shops', Shops, 'shop')
router.register(r'records', Records, 'record')

urlpatterns = [
    path('register', register_user),
    path('login', login_user),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
]