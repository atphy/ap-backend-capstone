"""View module for handling requests about shops"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Shop


class Shops(ViewSet):
    """Fullstack shops"""

    def list(self, request):
        """Handle GET requests to get all shops

        Returns:
            Response -- JSON serialized list of shops
        """
        shops = Shop.objects.all()

        serializer = ShopSerializer(
            shops, many=True, context={'request': request})
        return Response(serializer.data)

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'profile', 'verified', 'address', 'city', 'state', 'zip_code', 'contact_phone', 'contact_email')