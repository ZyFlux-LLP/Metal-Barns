'use client';

import { useEffect } from 'react';

const projects = [
  {
    img: '/project-mercedes-showroom.jpg',
    alt: 'Mercedes-Benz Automobile Showroom MBI Project',
    client: 'Mercedes-Benz Showroom',
    desc: 'Completed a 10,000 sqft high-end automobile showroom with complex RCC to steel connections, demonstrating capability in intricate designs.',
    year: 'Delivered: 2015',
  },
  {
    img: '/project-coldstorage.jpg',
    alt: 'Cold Storage Facility MBI Project',
    client: 'Cold Storage Facility',
    desc: 'Designed and built a large-scale cold storage facility with multiple loading docks, insulated panels, and fully compliant structural steel.',
    year: 'Industrial Cold Chain',
  },
  {
    img: '/project-warehousing.webp',
    alt: 'Structural Steel Frame Building',
    client: 'Minimalistic Foundations',
    desc: 'Designed and delivered extensive warehousing featuring minimalistic civil foundations and advanced PCC techniques.',
    year: 'Industrial Warehousing',
  },
  {
    img: '/project-manufacturing.webp',
    alt: 'Manufacturing Plant Metal Barns',
    client: 'Manufacturing Plant',
    desc: 'Turnkey design, engineering and construction for large-scale manufacturing units, ensuring optimal floor layouts.',
    year: 'Complete EPC Solution',
  },
  {
    img: '/project-bungalow.jpg',
    alt: 'Steel Frame Bungalow MBI Project',
    client: 'Residential Bungalow',
    desc: 'Contemporary steel-framed residential bungalow showcasing MBI\'s versatility beyond industrial structures — elegant, durable, and efficient.',
    year: 'Residential Steel',
  },
  {
    img: '/project-logistics.webp',
    alt: 'Large Logistics Center',
    client: 'Logistics & Storage',
    desc: 'Delivered multi-level storage buildings achieving record tonnage and time efficiency, complete with stringent safety compliance.',
    year: 'Large Scale Storage',
  },
];

export default function ProjectsSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Header text mask
      gsap.utils.toArray<HTMLElement>('.text-mask span').forEach((el) => {
        gsap.fromTo(
          el,
          { y: '110%' },
          {
            y: '0%',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el.closest('.text-mask'), start: 'top 90%' },
          }
        );
      });

      // Fade-up
      gsap.utils.toArray<HTMLElement>('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      });

      // Staggered project cards
      const cards = document.querySelectorAll('.project-grid .gsap-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.project-grid', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <h2 className="text-mask">
          <span>Project Showcase</span>
        </h2>
        <div className="gsap-fade-up">
          <p style={{ color: '#aaa', marginTop: '1rem' }}>
            A selection of our turnkey engineering and construction achievements across India.
          </p>
        </div>
      </div>

      <div className="project-grid">
        {projects.map((p) => (
          <div className="project-card gsap-card" key={p.client}>
            <div className="project-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.alt} />
            </div>
            <div className="project-content">
              <div className="project-client">{p.client}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-year">{p.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
