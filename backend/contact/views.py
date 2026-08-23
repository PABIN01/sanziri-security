from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics
from rest_framework.throttling import ScopedRateThrottle

from .models import ContactMessage, NewsletterSubscriber
from .serializers import (
    ContactMessageSerializer,
    NewsletterSubscriberSerializer,
)


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()
    throttle_scope = "contact"

    def perform_create(self, serializer):
        contact = serializer.save()

        send_mail(
            subject=f"Nouveau message de contact — {contact.subject}",
            message=(
                "Vous avez reçu un nouveau message depuis le site "
                "Sanziri Security.\n\n"
                f"Nom : {contact.name}\n"
                f"Email : {contact.email}\n"
                f"Téléphone : {contact.phone or 'Non renseigné'}\n"
                f"Sujet : {contact.subject}\n\n"
                f"Message :\n{contact.message}\n"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )


class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    throttle_scope = "newsletter"

    def perform_create(self, serializer):
        subscriber = serializer.save()

        # Notification à Sanziri Security
        send_mail(
            subject="Nouvelle inscription à la newsletter",
            message=(
                "Une nouvelle personne vient de s'inscrire "
                "à la newsletter Sanziri Security.\n\n"
                f"Email : {subscriber.email}\n"
                f"Date d'inscription : {subscriber.subscribed_at}\n"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        # Confirmation envoyée à l'abonné
        send_mail(
            subject="Bienvenue dans la newsletter Sanziri Security",
            message=(
                "Bonjour,\n\n"
                "Nous vous confirmons votre inscription à la newsletter "
                "Sanziri Security.\n\n"
                "Vous recevrez prochainement nos actualités, conseils "
                "et informations sur nos services de sécurité.\n\n"
                "Merci pour votre confiance.\n\n"
                "L'équipe Sanziri Security"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[subscriber.email],
            fail_silently=False,
        )