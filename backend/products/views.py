from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Product
from .serializers import OrderSerializer, ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(is_active=True).prefetch_related(
            "related_products"
        )


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_active=True).prefetch_related(
        "related_products"
    )
    lookup_field = "slug"

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    throttle_scope = "orders"