from django.core import mail
from django.test import override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage, NewsletterSubscriber

# EMAIL_BACKEND remplacé par locmem pour ces tests : on vérifie que
# l'email est bien "envoyé" sans dépendre d'un vrai serveur SMTP.
TEST_EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"


@override_settings(EMAIL_BACKEND=TEST_EMAIL_BACKEND)
class ContactMessageAPITests(APITestCase):
    def test_create_contact_message_success(self):
        url = reverse("contact-create")
        payload = {
            "name": "Jean Dupont",
            "email": "jean.dupont@example.com",
            "phone": "0600000000",
            "subject": "Demande de devis",
            "message": "Bonjour, je souhaite un devis pour la surveillance de mon commerce.",
        }

        response = self.client.post(url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        # Une notification interne doit être envoyée.
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn("Demande de devis", mail.outbox[0].subject)

    def test_create_contact_message_missing_required_fields(self):
        url = reverse("contact-create")
        response = self.client.post(url, {"name": "Jean Dupont"}, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactMessage.objects.count(), 0)
        self.assertEqual(len(mail.outbox), 0)


@override_settings(EMAIL_BACKEND=TEST_EMAIL_BACKEND)
class NewsletterSubscribeAPITests(APITestCase):
    def test_subscribe_success(self):
        url = reverse("newsletter-subscribe")
        response = self.client.post(
            url, {"email": "Client@Example.com"}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(NewsletterSubscriber.objects.count(), 1)
        # L'email doit être normalisé en minuscules (validate_email).
        self.assertEqual(
            NewsletterSubscriber.objects.first().email, "client@example.com"
        )
        # 2 emails : notification interne + confirmation à l'abonné.
        self.assertEqual(len(mail.outbox), 2)

    def test_subscribe_duplicate_email_rejected(self):
        NewsletterSubscriber.objects.create(email="deja-inscrit@example.com")

        url = reverse("newsletter-subscribe")
        response = self.client.post(
            url, {"email": "deja-inscrit@example.com"}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(NewsletterSubscriber.objects.count(), 1)