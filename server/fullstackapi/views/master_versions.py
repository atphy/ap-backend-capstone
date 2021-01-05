from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import MasterVersion, Labels
import discogs_client
import sys

class MasterVersionSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        artist = self.request.query_params.get("artist", None)
        master = self.request.query_params.get("master", None)
        results = d.search(type='release', artist=artist, release_title=master).page(1)
        
        serializer = MasterVersionSearchSerializer(
            results, many=True, context={'request': request})
        return Response(serializer.data)

class MasterVersionSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterVersion
        fields = ("__all__")

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Labels
        fields = ("__all__")
