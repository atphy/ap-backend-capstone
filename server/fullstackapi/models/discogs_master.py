"""Master search Module"""
from django.db import models

class Master(models.Model):
    """Master search Model"""
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
