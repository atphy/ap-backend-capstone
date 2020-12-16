"""View module for handling requests about profiles"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Profile


class Profiles(ViewSet):
    """Fullstack profiles"""

    def list(self, request):
        """Handle GET requests to get all profiles

        Returns:
            Response -- JSON serialized list of profiles
        """
        profiles = Profile.objects.all()

        serializer = ProfileSerializer(
            profiles, many=True, context={'request': request})
        return Response(serializer.data)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_type', 'username', 'first_name', 'last_name', 'email')