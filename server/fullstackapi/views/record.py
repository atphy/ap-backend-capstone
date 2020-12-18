"""View module for handling requests about shops"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework import status
from fullstackapi.models import Record, Profile, Shop

class Records(ViewSet):
    """Fullstack records"""

    def list(self, request):
        # CUSTOMER method
        """Handle GET requests to get all Records

        Returns:
            Response -- JSON serialized list of Records
        """
        records = Record.objects.all()

        serializer = RecordListSerializer(
            records, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        #SHOP and CUSTOMER method
        """Handle GET request for single record
        Returns:
            Response JSON serialized record instance
        """
        try:
            record = Record.objects.get(pk=pk)

            serializer = RecordDetailSerializer(record, context={'request': request})
            return Response(serializer.data)
        except Exception as ex:
            return HttpResponseServerError(ex)

    def create(self, request):
        # SHOP method
        """Handle POST operations for records"""

        record = Record()

        profile = Profile.objects.get(user=request.auth.user)
        shop = Shop.objects.get(profile=profile)

        record.discogs_id = request.data["discogs_id"]
        record.shop_id = shop
        record.name = request.data["name"]
        record.artist = request.data["artist"]
        record.label =  request.data["label"]
        record.catalogue_number = request.data["catalogue_number"]
        record.country = request.data["country"]
        record.year = request.data["year"]
        record.media_condition = request.data["media_condition"]
        record.sleeve_condition = request.data["sleeve_condition"]
        record.price = request.data["price"]
        record.image_url = "media/placeholder 150.png"
        record.notes = request.data["notes"]

        try:
            record.save()
            serializer = RecordDetailSerializer(record, context={'request': request})

            return Response(serializer.data)
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk=None):
        """Handle PUT requests for a record

        Returns:
            Response -- Empty body with 204 status code
        """
        profile = Profile.objects.get(user=request.auth.user)
        shop = Shop.objects.get(profile=profile)

        record = Record.objects.get(pk=pk)
        record.discogs_id = request.data["discogs_id"]
        record.shop_id = record.shop_id
        record.name = request.data["name"]
        record.artist = request.data["artist"]
        record.label =  request.data["label"]
        record.catalogue_number = request.data["catalogue_number"]
        record.country = request.data["country"]
        record.year = request.data["year"]
        record.media_condition = request.data["media_condition"]
        record.sleeve_condition = request.data["sleeve_condition"]
        record.price = request.data["price"]
        record.image_url = "media/placeholder 150.png"
        record.notes = request.data["notes"]
        
        if record.shop_id == shop:
            record.save()
            serializer = RecordDetailSerializer(record, context={'request': request})

            return Response(serializer.data)

        else:
            return Response({"reason": "selected record does not belong to your shop"}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        # SHOP method
        """Handle DELETE requests for a single record
        Returns:
            Response -- 200, 404, or 500 status code
        """
        try:
            record = Record.objects.get(pk=pk)
            profile = Profile.objects.get(user=request.auth.user)
            shop = Shop.objects.get(profile=profile)

            if record.shop_id == shop:
                record.delete()

            else:
                return Response({"reason": "selected record does not belong to your shop"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        except Record.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

"""Serializer for records list view"""
class RecordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'shop_id', 'name', 'artist', 'price', 'image_url', 'date_added')

"""Serializer for single record detail view"""
class RecordDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'shop_id', 'name', 'artist', 'label', 'catalogue_number', 'country', 'year', 'media_condition', 'sleeve_condition', 'price', 'image_url', 'notes')



