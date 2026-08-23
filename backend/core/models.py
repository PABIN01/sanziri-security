from django.db import models

# Create your models here.
from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)

    description = models.TextField()

    features = models.JSONField(
        default=list,
        blank=True,
    )

    icon = models.CharField(
        max_length=100,
        blank=True,
    )

    image = models.ImageField(
        upload_to="services/",
        blank=True,
        null=True,
    )

    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        indexes = [
            models.Index(fields=["is_active"]),
            models.Index(fields=["order"]),
        ]

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    quote = models.TextField()
    author = models.CharField(max_length=150)
    role = models.CharField(max_length=200, blank=True)

    image = models.ImageField(
        upload_to="testimonials/",
        blank=True,
        null=True,
    )

    rating = models.PositiveSmallIntegerField(default=5)
    category = models.CharField(max_length=100, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["is_active"]),
        ]

    def __str__(self):
        return self.author