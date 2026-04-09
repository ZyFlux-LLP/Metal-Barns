import type { Metadata } from 'next';
import JourneySection from '@/components/JourneySection';
import FoundersSection from '@/components/FoundersSection';

export const metadata: Metadata = {
  title: 'Our Journey | Metal Barns India',
  description:
    'From 19 team members in 2014 to 276+ today — follow Metal Barns India\'s decade-long journey of structural excellence and innovation.',
};

export default function JourneyPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-construction-sunset.jpg" alt="MBI Journey" className="page-header-bg" />
        <div className="page-header-overlay" />
        <div className="page-header-content">
          <p className="page-header-eyebrow">Since 2014</p>
          <h1 className="page-header-title">
            Our
            <br />
            Journey.
          </h1>
        </div>
      </div>

      <JourneySection />
      <FoundersSection />
    </>
  );
}
