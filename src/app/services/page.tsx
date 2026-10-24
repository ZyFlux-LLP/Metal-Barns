import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/site';
import ServicesSection from '@/components/ServicesSection';
import FactoryFloorSection from '@/components/FactoryFloorSection';
import MachinerySection from '@/components/MachinerySection';

export const metadata: Metadata = pageMetadata(
  'Services',
  'EPC for steel structures, 360-degree compliance, layout design, and innovative engineering. Explore Metal Barns India\'s core capabilities.',
  '/services'
);

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero-construction-sunset.jpg" alt="MBI Services" className="page-header-bg" />
        <div className="page-header-overlay" />
        <div className="page-header-content">
          <p className="page-header-eyebrow">What We Deliver</p>
          <h1 className="page-header-title">
            Our
            <br />
            Services.
          </h1>
        </div>
      </div>

      <ServicesSection />
      <FactoryFloorSection />
      <MachinerySection />
    </>
  );
}
