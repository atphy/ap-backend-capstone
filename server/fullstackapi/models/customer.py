"""Customer Model Module"""
from django.db import models

class Customer(models.Model):
    """Customer Model"""
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE, related_name="customer_profile")
    default_zip = models.IntegerField()
    phone = models.CharField(max_length=10)