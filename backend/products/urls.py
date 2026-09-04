from django.urls import path
from .views import OrderCreateView, ProductListView, ProductDetailView


urlpatterns = [
    path("", ProductListView.as_view(), name="product-list"),
    path("orders/", OrderCreateView.as_view(), name="order-create"),
    path("<slug:slug>/", ProductDetailView.as_view(), name="product-detail"),
]