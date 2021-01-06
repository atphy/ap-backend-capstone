"""Label Module"""
from django.db import models

class Labels(models.Model):
    """Label Model"""
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
