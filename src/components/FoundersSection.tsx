'use client';

import { useEffect } from 'react';

const founders = [
  {
    initials: 'RD',
    name: 'Rajesh Deshmukh',
    role: 'Co-Founder & Managing Director',
    badge: 'Visionary',
    bio: 'With over 22 years in the steel and heavy manufacturing sector, Rajesh spearheaded the vision for Metal Barns India in 2014. His deep expertise in large-scale EPC projects and project management has driven MBI\'s growth from 19 to 276+ team members. Previously held senior roles at JSW Steel and L&T Construction.',
    stats: [
      { num: '22+', label: 'Yrs Experience' },
      { num: '₹120Cr+', label: 'Projects Led' },
      { num: '2014', label: 'Founded MBI' },
    ],
  },
  {
    initials: 'AK',
    name: 'Anil Kulkarni',
    role: 'Co-Founder & Director – Engineering',
    badge: 'Engineer',
    bio: 'Anil brings 20+ years of structural engineering and pre-engineered building design expertise. A graduate of VNIT Nagpur, he has been instrumental in building MBI\'s in-house engineering capabilities and ISO 9001:2015 quality systems. His technical leadership ensures every structure is built to last.',
    stats: [
      { num: '20+', label: 'Yrs Experience' },
      { num: '104', label: 'Acres PEB Built' },
      { num: 'ISO', label: '9001:2015 Lead' },
    ],
  },
];

export default function FoundersSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Section header text mask
      gsap.utils.toArray<HTMLElement>('.founders .text-mask span').forEach((el) => {
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

      // Founder cards stagger
      gsap.utils.toArray<HTMLElement>('.founder-card').forEach((card, i) => {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 80%' },
        });
      });
    };

    run();
  }, []);

  return (
    <section className="founders" id="founders">
      <div className="founders-header">
        <h2 className="text-mask" style={{ display: 'block' }}>
          <span>Meet The</span>{' '}
          <span style={{ color: 'var(--brand-blue)' }}>Founders</span>
        </h2>
        <p style={{ marginTop: '1rem' }}>
          The minds behind Metal Barns India — a combined legacy of 42+ years in steel,
          engineering, and construction across India&apos;s most demanding projects.
        </p>
      </div>

      <div className="founders-grid">
        {founders.map((f) => (
          <div className="founder-card" key={f.name}>
            <div className="founder-avatar">
              <div className="founder-initials">{f.initials}</div>
              <div className="founder-badge">{f.badge}</div>
            </div>
            <div className="founder-info">
              <div className="founder-name">{f.name}</div>
              <div className="founder-role">{f.role}</div>
              <p className="founder-bio">{f.bio}</p>
              <div className="founder-stats">
                {f.stats.map((s) => (
                  <div className="founder-stat-item" key={s.label}>
                    <span className="founder-stat-num">{s.num}</span>
                    <span className="founder-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
