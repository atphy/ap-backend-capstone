"""Record Model Module"""
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Record(models.Model):
    """Record Model"""
    discogs_id = models.IntegerField()
    shop_id = models.ForeignKey("Shop", on_delete=models.CASCADE, related_name="inventory")
    name = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    catalogue_number = models.CharField(max_length=15)
    country = models.CharField(max_length=2)
    year = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(9999)])
    media_condition = models.CharField(max_length=3)
    sleeve_condition = models.CharField(max_length=3)
    price = models.FloatField(
        validators=[MinValueValidator(0.00), MaxValueValidator(27500.00)],)
    image_url = models.ImageField(upload_to="album_art", null=True)
    notes = models.CharField(max_length=200)
    date_added = models.DateTimeField(auto_now_add=True)