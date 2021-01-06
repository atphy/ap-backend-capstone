from fullstackapi.services import search_artist
from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import Artist
import discogs_client
from discogs_client import models

class ArtistSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        artist = self.request.query_params.get("artist", None)
        results = d.search(artist, type='artist', per_page=10).page(1)
        artists = []
        for artist in results:
            result = artist.data
            artists.append(result)

        return Response(artists)