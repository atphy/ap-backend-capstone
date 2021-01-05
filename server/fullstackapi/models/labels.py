"""Master Version search Module"""
from django.db import models

class Labels(models.Model):
    """Master Version search Model"""
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
