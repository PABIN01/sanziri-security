from django.shortcuts import render

# Create your views here.
from rest_framework import generics

from .models import Service, Testimonial
from .serializers import ServiceSerializer, TestimonialSerializer


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(is_active=True)


class ServiceDetailView(generics.RetrieveAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True)
    lookup_field = "slug"


class TestimonialListView(generics.ListAPIView):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        return Testimonial.objects.filter(is_active=True)