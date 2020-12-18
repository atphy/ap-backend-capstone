"""View module for handling requests about profiles"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework import status
from fullstackapi.models import Profile


class Profiles(ViewSet):
    """Fullstack profiles"""

    def list(self, request):
        """Handle GET requests to get all profiles

        Returns:
            Response -- JSON serialized list of profiles
        """
        current_profile = Profile.objects.get(user=request.auth.user)
        profiles = Profile.objects.all()

        serializer = ProfileSerializer(
            profiles, many=True, context={'request': request})
        if current_profile.profile_type == 1:
            return Response(serializer.data)

        else: 
            return Response({"reason": "you are not authorized to perform that action"}, status=status.HTTP_400_BAD_REQUEST)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_type', 'username', 'first_name', 'last_name', 'email')