from django.db import models

# Create your models here.


class Button(models.Model):
    count = models.IntegerField()

    def __str__(self):
        return self.count
