from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import MasterVersion, Labels
import discogs_client
import sys

class TestMasterVersionSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        master = self.request.query_params.get("master", None)
        masters = d.master(master)
        versions = masters.versions.page(1)
        releases = []
        for version in versions:
            release = version.data
            releases.append(release)
            
        return Response(releases)
    