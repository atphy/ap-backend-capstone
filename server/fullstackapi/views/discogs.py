from fullstackapi.services import search_artist
from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import Artist
import discogs_client
from discogs_client import models

class TestArtistSearch(ViewSet):
    def list(self,request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        results = d.search('Pavement', type='artist')
        print(results)
        
        serializer = ArtistSearchSerializer(
            results, many=True, context={'request': request})
        return Response(serializer.data)

class ArtistSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ("__all__")