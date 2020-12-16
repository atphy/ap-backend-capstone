"""Profile Model Module"""
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User

class Profile(models.Model):
    """Profile Model
    
    profile_type defines admin(1), shop(2), or customer(3)"""
    profile_type = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(3)])
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    @property
    def username(self):
        return self.user.username

    @property
    def first_name(self):
        return self.user.first_name

    @property
    def last_name(self):
        return self.user.last_name

    @property
    def email(self):
        return self.user.email