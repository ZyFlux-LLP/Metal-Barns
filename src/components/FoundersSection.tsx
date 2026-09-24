'use client';

import { useEffect } from 'react';

const founders = [
  {
    photo: '/founders/jaya-guha.jpeg',
    initials: 'JG',
    name: 'Jaya Guha',
    role: 'Co-Founder',
    badge: 'Finance & Sales',
    bio: 'A Sales and Finance professional with two decades of experience, Jaya previously served as Deputy Vice President at Bajaj Allianz, India\'s 3rd largest life insurance company, where she was responsible for SBU profitability across Rest of Maharashtra and received multiple performance awards. At Metal Barns, she leads Finance, Accounting, Sales, Statutory Compliances, and Vendor Relationships, driving effective rate and budgetary control that has been instrumental to the organization\'s growth.',
    stats: [
      { num: '20+', label: 'Yrs Experience' },
      { num: 'DVP', label: 'Ex-Bajaj Allianz' },
      { num: 'PG', label: 'Finance & Marketing' },
    ],
  },
  {
    photo: '/founders/avijit-guha.jpeg',
    initials: 'AG',
    name: 'Avijit Guha',
    role: 'Co-Founder',
    badge: 'Strategy & Business Development',
    bio: 'A Business Development and Systems professional with 13 years of experience, Avijit previously served as Assistant Vice President (IR & PR) for a large fund manager, leading international business development, systems design, and statutory compliance. At Metal Barns, he drives Strategy, Business Development, Marketing, Production, and Customer Service, championing a Customer First approach across the organization.',
    stats: [
      { num: '13+', label: 'Yrs Experience' },
      { num: 'AVP', label: 'Ex-IR & PR' },
      { num: 'PG', label: 'Business Admin' },
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
          The minds behind Metal Barns India — combining two decades of finance and sales
          leadership with over a decade of business development and systems expertise to
          drive MBI forward.
        </p>
      </div>

      <div className="founders-grid">
        {founders.map((f) => (
          <div className="founder-card" key={f.name}>
            <div className="founder-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.photo} alt={f.name} className="founder-photo" />
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
