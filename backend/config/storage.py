from whitenoise.storage import CompressedManifestStaticFilesStorage


class ForgivingManifestStaticFilesStorage(CompressedManifestStaticFilesStorage):
    """
    Identique à CompressedManifestStaticFilesStorage, sauf que
    collectstatic ne plante plus si un fichier CSS référence une
    ressource manquante (ex: polices .eot absentes du package DRF,
    icônes manquantes de l'admin Django selon la version). On ignore
    le fichier en erreur et on continue au lieu de stopper tout le
    déploiement.
    """

    def post_process(self, *args, **kwargs):
        for name, hashed_name, processed in super().post_process(*args, **kwargs):
            if isinstance(processed, Exception):
                continue
            yield name, hashed_name, processed