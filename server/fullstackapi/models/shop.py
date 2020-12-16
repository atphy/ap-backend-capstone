"""Shop Model Module"""
from django.db import models
from django.contrib.auth.models import User

class Shop(models.Model):
    """Shop Model"""
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE, related_name="shop_profile")
    verified = models.BooleanField()
    address = models.CharField(max_length=55)
    city = models.CharField(max_length=55)
    state = models.CharField(max_length=2)
    zip_code = models.IntegerField()
    contact_phone = models.CharField(max_length=10)
    contact_email = models.CharField(max_length=30)