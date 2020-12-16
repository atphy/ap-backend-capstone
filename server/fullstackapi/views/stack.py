"""View module for handling requests about stacks"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Stack


class Stacks(ViewSet):
    """Fullstack shops"""

    def list(self, request):
        """Handle GET requests to get all stacks

        Returns:
            Response -- JSON serialized list of stacks
        """
        stacks = Stack.objects.all()

        serializer = StackSerializer(
            stacks, many=True, context={'request': request})
        return Response(serializer.data)

class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ('customer_id', 'record')