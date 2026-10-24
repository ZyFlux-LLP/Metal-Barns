import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { OG_BASE, SITE_NAME, SITE_URL, TWITTER_BASE } from '@/lib/site';

const description =
  'Metal Barns India (MBI) designs, fabricates and erects pre-engineered steel buildings — factories, warehouses, cold storage, showrooms and more. ISO 9001:2015 certified, based in Nagpur, delivering across India.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Metal Barns India | Pre-Engineered Steel Buildings',
    template: `%s | ${SITE_NAME}`,
  },
  description,
  keywords: [
    'metal barns',
    'Metal Barns India',
    'PEB',
    'pre-engineered buildings',
    'steel buildings',
    'steel structures',
    'industrial sheds',
    'warehouse construction',
    'PEB manufacturer Nagpur',
    'Nagpur',
    'India',
  ],
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    ...OG_BASE,
    url: '/',
    title: 'Metal Barns India | Pre-Engineered Steel Buildings',
    description,
  },
  twitter: {
    ...TWITTER_BASE,
    title: 'Metal Barns India | Pre-Engineered Steel Buildings',
    description,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  alternateName: 'MBI',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: 'avijit@metalbarns.in',
  telephone: '+91 76200 44077',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'W 12/12 MIDC, Hingna Road Area',
    addressLocality: 'Nagpur',
    postalCode: '440016',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('mbi-theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
