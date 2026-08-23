from decimal import Decimal

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Product


class ProductAPITests(APITestCase):
    def setUp(self):
        self.active_product = Product.objects.create(
            name="Caméra de surveillance HD",
            slug="camera-surveillance-hd",
            description="Caméra HD pour extérieur.",
            price=Decimal("199.99"),
            category="Vidéosurveillance",
            is_active=True,
        )
        self.inactive_product = Product.objects.create(
            name="Ancien modèle",
            slug="ancien-modele",
            description="Produit retiré du catalogue.",
            price=Decimal("49.99"),
            category="Vidéosurveillance",
            is_active=False,
        )

    def test_list_returns_only_active_products(self):
        url = reverse("product-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        slugs = [item["slug"] for item in response.data]
        self.assertIn(self.active_product.slug, slugs)
        self.assertNotIn(self.inactive_product.slug, slugs)

    def test_detail_returns_active_product(self):
        url = reverse("product-detail", kwargs={"slug": self.active_product.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], self.active_product.name)

    def test_detail_404_for_inactive_product(self):
        url = reverse("product-detail", kwargs={"slug": self.inactive_product.slug})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_detail_404_for_unknown_slug(self):
        url = reverse("product-detail", kwargs={"slug": "inexistant"})
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_includes_related_products_field(self):
        other = Product.objects.create(
            name="Détecteur de mouvement",
            slug="detecteur-mouvement",
            description="Détecteur infrarouge.",
            price=Decimal("29.99"),
            category="Alarme",
            is_active=True,
        )
        self.active_product.related_products.add(other)

        url = reverse("product-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        product_data = next(
            item for item in response.data if item["slug"] == self.active_product.slug
        )
        self.assertIn(other.id, product_data["related_products"])