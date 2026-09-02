from rest_framework import serializers

from .models import ContactMessage, NewsletterSubscriber


class ContactMessageSerializer(serializers.ModelSerializer):
    # Honeypot anti-spam : champ invisible pour un humain (masqué en CSS
    # côté frontend), qui doit toujours rester vide. Un bot qui remplit
    # tous les champs du formulaire le remplira aussi -> la soumission
    # est alors traitée comme spam (voir ContactMessageCreateView).
    website = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True,
    )

    class Meta:
        model = ContactMessage
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "subject",
            "message",
            "status",
            "created_at",
            "updated_at",
            "website",
        ]
        read_only_fields = [
            "id",
            "status",
            "created_at",
            "updated_at",
        ]

    @property
    def is_spam(self):
        return bool(self.initial_data.get("website"))

    def validate(self, attrs):
        # Ne fait jamais partie des données du modèle : on le retire
        # avant la création de l'objet.
        attrs.pop("website", None)
        return attrs


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    # Honeypot anti-spam (voir ContactMessageSerializer.website).
    website = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True,
    )

    class Meta:
        model = NewsletterSubscriber
        fields = ["id", "email", "subscribed_at", "website"]
        read_only_fields = ["id", "subscribed_at"]

    @property
    def is_spam(self):
        return bool(self.initial_data.get("website"))

    def validate_email(self, value):
        return value.lower().strip()

    def validate(self, attrs):
        attrs.pop("website", None)
        return attrs