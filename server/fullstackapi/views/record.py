"""View module for handling requests about shops"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Record


class Records(ViewSet):
    """Fullstack records"""

    def list(self, request):
        """Handle GET requests to get all Records

        Returns:
            Response -- JSON serialized list of Records
        """
        records = Record.objects.all()

        serializer = RecordSerializer(
            records, many=True, context={'request': request})
        return Response(serializer.data)


"""Basic Serializer for all records"""
class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'discogs_id', 'shop_id', 'name', 'artist', 'label', 'catalogue_number', 'country', 'year', 'media_condition', 'sleeve_condition', 'price', 'image_url', 'notes', 'date_added')
        depth = 1



