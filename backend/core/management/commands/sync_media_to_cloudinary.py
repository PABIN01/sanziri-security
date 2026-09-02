import os

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from blog.models import Post
from core.models import Service, Testimonial
from products.models import Product

# (modèle, nom du champ image) pour chaque modèle concerné
MODELS_WITH_IMAGE = [
    (Service, "image"),
    (Testimonial, "image"),
    (Product, "image"),
    (Post, "image"),
]


class Command(BaseCommand):
    help = (
        "Ré-uploade vers le stockage par défaut (Cloudinary si configuré) "
        "les images déjà référencées en base, en passant par le champ du "
        "modèle pour que le nom réellement attribué par Cloudinary soit "
        "correctement enregistré en base (contrairement à un simple "
        "envoi de fichier brut)."
    )

    def handle(self, *args, **options):
        media_root = str(settings.MEDIA_ROOT)
        updated = 0
        missing = 0

        for model, field_name in MODELS_WITH_IMAGE:
            for obj in model.objects.exclude(**{field_name: ""}).exclude(
                **{f"{field_name}__isnull": True}
            ):
                field_file = getattr(obj, field_name)
                current_name = field_file.name
                local_path = os.path.join(media_root, current_name)

                if not os.path.isfile(local_path):
                    self.stdout.write(
                        self.style.WARNING(
                            f"Fichier local introuvable, ignoré : "
                            f"{model.__name__}#{obj.pk} -> {current_name}"
                        )
                    )
                    missing += 1
                    continue

                with open(local_path, "rb") as f:
                    field_file.save(
                        os.path.basename(current_name), File(f), save=True
                    )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"{model.__name__}#{obj.pk} : {current_name} -> "
                        f"{getattr(obj, field_name).name}"
                    )
                )
                updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"\nTerminé. {updated} enregistrement(s) mis à jour, "
                f"{missing} fichier(s) local(aux) introuvable(s)."
            )
        )