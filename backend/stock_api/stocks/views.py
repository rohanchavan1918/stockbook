from django.shortcuts import render,HttpResponse
from .models import Stocks,Stock_data
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializers import StocksSerializer,JsonSerializer
from django.core.mail import send_mail

# Create your views here.

class StocksList(generics.ListCreateAPIView):
    serializer_class = StocksSerializer
    queryset = Stocks.objects.all()
    
    def get_serializer_class(self):
        switcher = {
            'GET' : StocksSerializer,
            'POST' : StocksSerializer,
        }
        return switcher.get(self.request.method)


class DetailedStockInfo(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StocksSerializer
    queryset = Stocks.objects.all()


class JsonData(generics.RetrieveUpdateDestroyAPIView):

    serializer_class = JsonSerializer
    queryset = Stock_data.objects.all()

class CreateJsonData(generics.CreateAPIView):
    serializer_class = JsonSerializer
    queryset = Stock_data.objects.all()


def alert(request, symbol):
    msg = 'You stock '+ symbol +' Started Making profit'
    print(msg)
    # send_mail(
       #'STOCK-BOOK Notification',msg,'<pass>',['<email>'],fail_silently=False)
    try:
        # send_mail('STOCK-BOOK Notification',msg,'<pass>',['<email>'],fail_silently=False)
        return HttpResponse(msg)
    except:
        return HttpResponse("SOME ERROR OCCOURED")
