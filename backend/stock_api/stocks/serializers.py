from rest_framework import serializers
from .models import Stocks,Stock_data
from . import models

class StocksSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Stocks
    

class JsonSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Stock_data
