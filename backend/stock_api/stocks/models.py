from django.db import models
from jsonfield import JSONField
from django.contrib.postgres.fields.jsonb import JSONField

# Create your models here.
class Stocks(models.Model):
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=25,unique=True)
    quantity = models.IntegerField()
    price = models.FloatField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Stock_data(models.Model):
    data = JSONField()

