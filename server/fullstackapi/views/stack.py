"""View module for handling requests about stacks"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from fullstackapi.models import Stack, Customer, Profile


class Stacks(ViewSet):
    """Fullstack shops"""

    def list(self, request):
        """Handle GET requests to get all stacks for current customer

        Returns:
            Response -- JSON serialized list of stacks
        """
        stacks = Stack.objects.all()

        #filtering stacks by customer
        profile = Profile.objects.get(user=request.auth.user)
        customer = Customer.objects.get(profile=profile)

        if customer is not None:
            stacks = stacks.filter(customer_id=customer)

        serializer = StackSerializer(
            stacks, many=True, context={'request': request})
        return Response(serializer.data)

class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ('customer_id', 'record')