from django.contrib import admin
from django.urls import path,re_path
from . import views
from .views import StocksList,DetailedStockInfo,alert,CreateJsonData,JsonData

urlpatterns = [
    path('stocks/', views.StocksList.as_view()),
    path('stocks/<int:pk>', views.DetailedStockInfo.as_view()),
    re_path(r'^alert/(?P<symbol>[a-zA-Z0-9_.-]+)/$', views.alert,),
]
