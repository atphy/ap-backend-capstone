"""View module for handling requests about stacks"""
from django.http import HttpResponseServerError
from django.core.exceptions import ValidationError
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from fullstackapi.models import Stack, Customer, Profile, Record


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

    def create(self, request):
        """Handle POST operations"""

        record = Record.objects.get(pk=request.data["record"])
        profile = Profile.objects.get(user=request.auth.user)
        customer = Customer.objects.get(profile=profile)

        stack = Stack()
        stack.record = record
        stack.customer_id = customer

        try: 
            stack.save()
            serializer = StackSerializer(stack, context={'request': request})
            return Response(serializer.data)
        except ValidationError as ex:
            return Response({"reason": ex.message}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """Handle DELETE requests for a single stack item

        Returns:
            Response -- 200, 404, or 500 status code
        """
        try:
            stack = Stack.objects.get(pk=pk)
            stack.delete()

            return Response({}, status=status.HTTP_204_NO_CONTENT)

        except Stack.DoesNotExist as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_404_NOT_FOUND)

        except Exception as ex:
            return Response({'message': ex.args[0]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stack
        fields = ('id', 'customer_id', 'record')
        #depth = 1