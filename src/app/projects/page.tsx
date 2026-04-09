import type { Metadata } from 'next';
import ProjectsSection from '@/components/ProjectsSection';

export const metadata: Metadata = {
  title: 'Project Showcase | Metal Barns India',
  description:
    'A selection of turnkey engineering and construction achievements by Metal Barns India — automobile showrooms, warehousing, manufacturing plants, and logistics centers.',
};

export default function ProjectsPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header" style={{ background: '#050505' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/aerial-industrial.jpg" alt="MBI Projects" className="page-header-bg" />
        <div className="page-header-overlay" />
        <div className="page-header-content">
          <p className="page-header-eyebrow">Our Work</p>
          <h1 className="page-header-title">
            Project
            <br />
            Showcase.
          </h1>
        </div>
      </div>

      <ProjectsSection />
    </>
  );
}
