from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import ReleaseInfo
import discogs_client
import sys

class ReleaseInfoSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        release_id = self.request.query_params.get("release", None)
        results = d.release(release_id)
        print(results)

        return Response(results.data)