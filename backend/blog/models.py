from django.db import models

# Create your models here.
from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True)

    excerpt = models.TextField()
    content = models.TextField()

    image = models.ImageField(
        upload_to="blog/",
        blank=True,
        null=True,
    )

    author = models.CharField(max_length=150)
    category = models.CharField(max_length=100)

    tags = models.JSONField(
        default=list,
        blank=True,
    )

    published_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["is_published"]),
            models.Index(fields=["published_at"]),
        ]

    def __str__(self):
        return self.title