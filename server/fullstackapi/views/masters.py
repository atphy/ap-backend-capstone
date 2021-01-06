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
        artist_id = self.request.query_params.get("artistId", None)
        masters = d.artist(artist_id).releases.page(1)
        all_releases = []
        for release in masters:
            master = release.data
            all_releases.append(master)
        sorted_releases = sorted(all_releases, key=lambda x: x['stats']['community']['in_wantlist'], reverse=True)
        return Response(sorted_releases)