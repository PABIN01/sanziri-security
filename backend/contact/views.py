import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response

from .models import ContactMessage, NewsletterSubscriber
from .serializers import (
    ContactMessageSerializer,
    NewsletterSubscriberSerializer,
)

logger = logging.getLogger(__name__)


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()
    throttle_scope = "contact"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_spam:
            # Honeypot rempli : on répond "succès" sans rien enregistrer
            # ni envoyer d'email, pour ne pas révéler au bot que sa
            # soumission a été détectée.
            logger.info("Soumission contact ignorée (honeypot rempli).")
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        contact = serializer.save()

        try:
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
        except Exception:
            # Le message est déjà enregistré en base : un échec SMTP ne
            # doit jamais faire échouer la réponse HTTP envoyée à
            # l'utilisateur.
            logger.exception(
                "Échec de l'envoi de l'email de notification pour le "
                "message de contact #%s",
                contact.pk,
            )


class NewsletterSubscribeView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer
    throttle_scope = "newsletter"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_spam:
            logger.info("Inscription newsletter ignorée (honeypot rempli).")
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_create(self, serializer):
        subscriber = serializer.save()

        try:
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
        except Exception:
            logger.exception(
                "Échec de l'envoi de l'email de notification interne pour "
                "l'inscription newsletter #%s",
                subscriber.pk,
            )

        try:
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
        except Exception:
            logger.exception(
                "Échec de l'envoi de l'email de confirmation à l'abonné #%s",
                subscriber.pk,
            )