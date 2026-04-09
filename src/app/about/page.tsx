import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'About MBI | Metal Barns India',
  description:
    'Learn about Metal Barns India — established 2014 in Nagpur, delivering pre-engineered steel building solutions with 42+ years of combined expertise.',
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/factory-interior.jpg" alt="MBI Factory Floor" className="page-header-bg" />
        <div className="page-header-overlay" />
        <div className="page-header-content">
          <p className="page-header-eyebrow">Who We Are</p>
          <h1 className="page-header-title">
            About
            <br />
            MBI.
          </h1>
        </div>
      </div>

      <AboutSection />
    </>
  );
}
