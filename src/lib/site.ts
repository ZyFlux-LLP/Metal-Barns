import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://metalbarns.in';
export const SITE_NAME = 'Metal Barns India';

// Shared social-share fields. A page's own openGraph/twitter replaces the root
// layout's entirely, so every page needs these spread in.
export const OG_BASE: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  siteName: SITE_NAME,
  locale: 'en_IN',
  images: [
    {
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Metal Barns India — Pre-Engineered Steel Buildings, Nagpur',
    },
  ],
};

export const TWITTER_BASE: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
  images: ['/og-image.jpg'],
};

// Per-page metadata with matching Open Graph / Twitter tags and a canonical URL
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OG_BASE, title: `${title} | ${SITE_NAME}`, description, url: path },
    twitter: { ...TWITTER_BASE, title: `${title} | ${SITE_NAME}`, description },
  };
}
