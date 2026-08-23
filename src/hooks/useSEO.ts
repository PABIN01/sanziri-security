import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

const SITE_NAME = 'Sanziri Security';
const SITE_URL = 'https://sanzirisecurity.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Met à jour le <title>, la meta description et les balises Open Graph /
 * Twitter Card de la page courante. Pas de dépendance externe (pas de
 * react-helmet) pour ne rien ajouter au bundle ni au risque de build.
 */
export function useSEO({ title, description, image, noIndex }: SEOOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:url', window.location.href);
    setMetaTag('property', 'og:image', image || DEFAULT_IMAGE);
    setMetaTag('property', 'og:site_name', SITE_NAME);

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image || DEFAULT_IMAGE);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
  }, [title, description, image]);
}