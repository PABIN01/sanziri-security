from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Service, Testimonial


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "order",
        "created_at",
    )
    list_filter = ("is_active",)
    search_fields = ("title", "description")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("order",)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "role",
        "category",
        "rating",
        "is_active",
        "created_at",
    )
    list_filter = ("category", "rating", "is_active")
    search_fields = ("author", "role", "quote")