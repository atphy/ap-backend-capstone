"""Customer Model Module"""
from django.db import models

class Customer(models.Model):
    """Customer Model"""
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE, related_name="customer_profile")
    default_zip = models.IntegerField()
    phone = models.CharField(max_length=10)

    @property
    def username(self):
        return self.profile.username

    @property
    def first_name(self):
        return self.profile.first_name

    @property
    def last_name(self):
        return self.profile.last_name

    @property
    def email(self):
        return self.profile.email