
# Register your models here.

from django.contrib import admin
from .models import ContactMessage
from .models import NewsletterSubscriber


# ContactMessageAdmin

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "subject",
        "status",
        "created_at",
    )
    list_filter = ("status", "subject")
    search_fields = ("name", "email", "phone", "message")
    readonly_fields = ("created_at", "updated_at")
    

# NewsletterSubscriberAdmin

@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at", "is_active")
    list_filter = ("is_active", "subscribed_at")
    search_fields = ("email",)
    ordering = ("-subscribed_at",)