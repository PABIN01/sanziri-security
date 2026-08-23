from django.urls import path

from .views import (
    ServiceDetailView,
    ServiceListView,
    TestimonialListView,
)


urlpatterns = [
    path("services/", ServiceListView.as_view(), name="service-list"),
    path(
        "services/<slug:slug>/",
        ServiceDetailView.as_view(),
        name="service-detail",
    ),
    path(
        "testimonials/",
        TestimonialListView.as_view(),
        name="testimonial-list",
    ),
]