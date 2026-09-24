'use client';

import { useEffect } from 'react';

const photos = [
  '/offices/mohpa/mohpa-1.jpeg',
  '/offices/mohpa/mohpa-2.jpeg',
  '/offices/mohpa/mohpa-3.jpeg',
  '/offices/mohpa/mohpa-4.jpeg',
  '/offices/mohpa/mohpa-5.jpeg',
  '/offices/mohpa/mohpa-6.jpeg',
];

export default function OfficesSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>('.offices .text-mask span').forEach((el) => {
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

      const cards = document.querySelectorAll('.offices-grid .office-photo');
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.offices-grid', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <section className="offices" id="offices">
      <div className="section-header">
        <h2 className="text-mask">
          <span>Our</span> <span style={{ color: 'var(--brand-blue)' }}>Unit II</span>{' '}
          <span>— Mohpa</span>
        </h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          Plot No 613–616, Near Mohpa ST Bus Stand, Kalmeshwar Saoner Road, District Nagpur.
        </p>
      </div>

      <div className="offices-grid">
        {photos.map((src, i) => (
          <div className="office-photo" key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`MBI Unit II Mohpa facility ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
