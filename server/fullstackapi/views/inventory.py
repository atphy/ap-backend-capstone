"""View module for handling requests shop records"""
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Profile, Shop, Record


class Inventory(ViewSet):
    """Shop can see their record information"""

    def list(self, request):
        """Handle GET requests shop's records

        Returns:
            Response -- JSON representation of user info and events
        """
        profile = Profile.objects.get(user=request.auth.user)
        shop = Shop.objects.get(profile=profile)
        records = Record.objects.filter(shop_id=shop)

        records = InventoryListSerializer(
            records, many=True, context={'request': request})

        # Manually construct the JSON structure you want in the response
        inventory = {}
        inventory["records"] = records.data

        return Response(inventory)

class InventoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'name', 'artist', 'label', 'catalogue_number', 'country', 'year', 'media_condition', 'sleeve_condition', 'price', 'image_url', 'notes')