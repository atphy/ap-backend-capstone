from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from fullstackapi.views import register_user, login_user
from fullstackapi.views import Shops, Records, Stacks, Profiles, Customers, Inventory, ArtistSearch, MasterSearch, MasterVersionSearch, ReleaseInfoSearch

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'shops', Shops, 'shop')
router.register(r'my_stack', Stacks, 'stack')
router.register(r'records', Records, 'record')
router.register(r'profiles', Profiles, 'profile')
router.register(r'customers', Customers, 'customer')
router.register(r'inventory', Inventory, 'inventory')
router.register(r'search_discogs_artist', ArtistSearch, 'search_discogs_artist')
router.register(r'search_discogs_masters', MasterSearch, 'search_discogs_masters')
router.register(r'search_discogs_versions', MasterVersionSearch, 'search_discogs_versions')
router.register(r'retrieve_discogs_release', ReleaseInfoSearch, 'retrieve_discogs_release')


urlpatterns = [
    path('', include(router.urls)),
    path('register', register_user),
    path('login', login_user),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
]