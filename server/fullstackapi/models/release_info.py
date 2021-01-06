"""Release Info search Module"""
from django.db import models
import discogs_client

class ReleaseInfo(models.Model):
    """Release Info search Model"""
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    year = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    formats = models.CharField(max_length=50, blank=True)
    labels = discogs_client.models.ListField('Label')
    notes = models.CharField(max_length=200)
    thumb = models.CharField(max_length=200)

    @property
    def label_name(self):
        return self.labels[0].data['catno']