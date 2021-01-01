"""Artist search Module"""
from django.db import models

class Artist(models.Model):
    """Artist search Model"""
    id = models.IntegerField(primary_key=True),
    name = models.CharField(max_length=50)
    # images = models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=None)

