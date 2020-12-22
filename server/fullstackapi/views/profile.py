"""View module for handling requests about profiles"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.decorators import action
from rest_framework import status
from fullstackapi.models import Profile
from django.contrib.auth.models import User


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

    @action(methods=['get'], detail=False)
    def current_user(self, request):
        current_profile = Profile.objects.get(user=request.auth.user)

        profile = ProfileSerializer(current_profile, context={'request': request})

        return Response(profile.data)

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('profile_type', 'username', 'first_name', 'last_name', 'email')