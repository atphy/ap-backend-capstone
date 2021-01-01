"""Master Version search Module"""
from django.db import models

class MasterVersion(models.Model):
    """Master Version search Model"""
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    country = models.CharField(max_length=50)