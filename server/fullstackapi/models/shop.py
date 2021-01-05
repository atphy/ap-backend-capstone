"""Shop Model Module"""
from django.db import models
from django.contrib.auth.models import User
from .record import Record
from pyzipcode import ZipCodeDatabase
from geopy import distance

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

    @property
    def records(self):
        records = Record.objects.filter(shop_id=self)
        return records

    @property
    def location(self):
        zcdb = ZipCodeDatabase()
        location_zip = zcdb[self.zip_code]
        location = [location_zip.latitude, location_zip.longitude]
        return location

    @property
    def customer_distance(self):
        zcdb = ZipCodeDatabase()
        customer_zip = zcdb[37216]
        customer_location = [customer_zip.latitude, customer_zip.longitude]
        location_distance = distance.distance(self.location, customer_location).mi
        rounded_distance = round(location_distance, 1)
        return rounded_distance