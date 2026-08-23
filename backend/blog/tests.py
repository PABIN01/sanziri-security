from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Post


class BlogAPITests(APITestCase):
    def setUp(self):
        self.published_post = Post.objects.create(
            title="5 conseils pour sécuriser votre entreprise",
            slug="5-conseils-securite-entreprise",
            excerpt="Nos meilleurs conseils.",
            content="Contenu complet de l'article.",
            author="Sanziri Security",
            category="Conseils",
            is_published=True,
            published_at=timezone.now(),
        )
        self.draft_post = Post.objects.create(
            title="Brouillon non publié",
            slug="brouillon-non-publie",
            excerpt="Ne doit pas apparaître.",
            content="Contenu en brouillon.",
            author="Sanziri Security",
            category="Conseils",
            is_published=False,
        )

    def test_list_returns_only_published_posts(self):
        url = reverse("post-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in response.data]
        self.assertIn(self.published_post.slug, slugs)
        self.assertNotIn(self.draft_post.slug, slugs)

    def test_detail_returns_published_post(self):
        url = reverse("post-detail", kwargs={"slug": self.published_post.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.published_post.title)

    def test_detail_404_for_draft_post(self):
        url = reverse("post-detail", kwargs={"slug": self.draft_post.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)