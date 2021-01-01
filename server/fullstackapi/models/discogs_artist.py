"""Artist search Module"""
from django.db import models

class Artist(models.Model):
    """Artist search Model"""
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

