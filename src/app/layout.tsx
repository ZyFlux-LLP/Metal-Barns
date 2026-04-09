import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Metal Barns India | Pre-Engineered Steel Buildings',
  description:
    'Metal Barns India (MBI) — Leading provider of pre-engineered steel building solutions. ISO 9001:2015 Certified. Based in Nagpur, India.',
  keywords: 'metal barns, PEB, pre-engineered buildings, steel structures, Nagpur, India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
