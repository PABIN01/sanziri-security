from whitenoise.storage import CompressedManifestStaticFilesStorage


class ForgivingManifestStaticFilesStorage(CompressedManifestStaticFilesStorage):
    """
    Identique à CompressedManifestStaticFilesStorage, sauf que
    collectstatic ne plante plus si un fichier CSS référence une
    ressource manquante (ex: bug connu de certains admin.css Django
    qui référencent une icône absente). On ignore, on continue.
    """

    manifest_strict = False