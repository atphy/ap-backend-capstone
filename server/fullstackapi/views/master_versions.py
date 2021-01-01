from rest_framework.viewsets import ViewSet
from rest_framework import serializers
from rest_framework.response import Response
from fullstackapi.models import MasterVersion
import discogs_client
import sys

class MasterVersionSearch(ViewSet):
    def list(self, request):
        d = discogs_client.Client('Fullstack/0.1 +@:atphy42@gmail.com', user_token="EMIDOqyOnyXKSDQGfzjhruBlRDBvBVaZnIDcaTOd")
        master_id = request.data["master_id"]
        results = d.master(master_id).versions
        
        serializer = MasterVersionSearchSerializer(
            results, many=True, context={'request': request})
        return Response(serializer.data)

class MasterVersionSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterVersion
        fields = ("__all__")

class TestMasterVersionSearchSerializer(serializers.Serializer):
    class Meta:
        model = discogs_client.models.Release
        fields = ("__all__")