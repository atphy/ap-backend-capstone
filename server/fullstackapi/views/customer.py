"""View module for handling requests about customers"""
from django.http import HttpResponseServerError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.decorators import action
from fullstackapi.models import Customer


class Customers(ViewSet):
    """Fullstack customers"""

    def list(self, request):
        """Handle GET requests to get all customers

        Returns:
            Response -- JSON serialized list of customers
        """
        customers = Customer.objects.all()

        serializer = CustomerSerializer(
            customers, many=True, context={'request': request})
        return Response(serializer.data)

    @action(methods=['get'], detail=False)
    def authed_customer(self, request):
        authed_customer = Customer.objects.get(profile=request.auth.user.id)

        serializer = CustomerSerializer(
            authed_customer, many=False, context={'request': request})
        return Response(serializer.data)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'profile', 'username', 'first_name', 'last_name', 'email', 'default_zip', 'phone')