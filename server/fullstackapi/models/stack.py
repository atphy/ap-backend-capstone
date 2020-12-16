"""Stack Model Module"""
from django.db import models

class Stack(models.Model):
    """Stack Model"""
    customer_id = models.ForeignKey("Customer", on_delete=models.CASCADE, related_name="tagging")
    record = models.ForeignKey("Record", on_delete=models.CASCADE, related_name="tagging")