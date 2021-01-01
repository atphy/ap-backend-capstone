from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import Master
import discogs_client
from discogs_client import models
import sys

class MasterSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        artist_id = request.data["artist_id"]
        results = d.artist(artist_id).releases
        
        serializer = MasterSearchSerializer(
            results, many=True, context={'request': request})
        return Response(serializer.data)

class MasterSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Master
        fields = ("id", "title")