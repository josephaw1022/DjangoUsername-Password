from django.db import models

# Create your models here.


class User(models.Model):
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    username = models.CharField(max_length=15)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    activeAccount = models.BooleanField()
