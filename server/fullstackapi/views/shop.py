"""View module for handling requests about shops"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from rest_framework.decorators import action
from fullstackapi.models import Shop, Record, Profile

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

    def retrieve(self, request, pk=None):
        """Handle GET request for single shop and records
        Returns:
            Response JSON serialized shop instance
        """
        try:
            shop = Shop.objects.get(pk=pk)
            records = Record.objects.filter(shop_id=shop)

            records = RecordSerializer(
                records, many=True, context={'request': request})
            shop = ShopSerializer(
                shop, many=False, context={'request': request})

            shop_records = {}
            shop_records["shop"] = shop.data
            shop_records["records"] = records.data

            # serializer = ShopRecordsSerializer(shop, context={'request': request})
            return Response(shop_records)
        except Exception as ex:
            return HttpResponseServerError(ex)

    @action(methods=['get', 'patch'], detail=True)
    def verification(self,request, pk=None):
        """Manages admins verifying shops"""
        current_profile = Profile.objects.get(user=request.auth.user)

        if current_profile.profile_type == 1:
            shop = Shop.objects.get(pk=pk)

            shop.verified = not shop.verified
            shop.save()

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        else: 
            return Response({"reason": "you are not authorized to perform that action"}, status=status.HTTP_400_BAD_REQUEST)
class RecordSerializer(serializers.HyperlinkedModelSerializer):
    """JSON serializer for records"""
    class Meta:
        model = Record
        fields = ('id', 'name', 'artist', 'price', 'image_url', 'date_added')

class ShopRecordsSerializer(serializers.ModelSerializer):

    records = RecordSerializer(many=True)
    class Meta:
        model = Shop
        fields = ('id', 'profile', 'verified', 'address', 'city', 'state', 'zip_code', 'contact_phone', 'contact_email')
class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ('id', 'profile', 'verified', 'username', 'first_name', 'last_name', 'email', 'address', 'city', 'state', 'zip_code', 'contact_phone', 'contact_email')