'use client';

import { useEffect, type ReactNode } from 'react';

type Capability = { num: string; title: string; desc: string; tags: string[]; icon: ReactNode };

const svgProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const capabilities: Capability[] = [
  {
    num: '01',
    title: 'EPC for Steel Structures',
    desc: 'Precision, performance and perfection define our EPC services. Our manufacturing process integrates innovative techniques with stringent quality standards to deliver outstanding steel structures.',
    tags: ['Engineering', 'Procurement', 'Fabrication', 'Erection'],
    icon: (
      <svg {...svgProps}>
        <path d="M5 4h14M5 20h14M12 4v16M8 4v16M16 4v16" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '360-Degree Compliance',
    desc: 'We ensure full compliance with safety and quality standards, providing peace of mind through every stage of your project.',
    tags: ['Safety', 'Quality', 'Documentation'],
    icon: (
      <svg {...svgProps}>
        <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Layout Design',
    desc: 'Our design team creates optimized layouts for industrial and logistics facilities, ensuring efficient use of space and resources.',
    tags: ['Industrial', 'Logistics', 'Space planning'],
    icon: (
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="1.5" />
        <path d="M3 10h8M11 3v18M11 15h10" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Innovative Engineering',
    desc: 'Our engineers bring cutting-edge designs and engineering solutions, addressing the most challenging structural requirements with innovation and expertise.',
    tags: ['Structural design', 'Optimization', 'Custom solutions'],
    icon: (
      <svg {...svgProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>('.cap-row').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        );
      });
    };

    run();
  }, []);

  return (
    <section className="capabilities" id="services">
      <div className="cap-intro">
        <p className="section-eyebrow">What we do</p>
        <h2>
          Core
          <br />
          Capabilities
        </h2>
        <p className="cap-lead">
          From the first drawing to the last bolt, one team engineers, fabricates and erects your
          steel structure.
        </p>
      </div>

      <div className="cap-list">
        {capabilities.map((c) => (
          <article className="cap-row" key={c.num}>
            <span className="cap-num">{c.num}</span>
            <div className="cap-body">
              <div className="cap-title">
                <span className="cap-icon">{c.icon}</span>
                <h3>{c.title}</h3>
              </div>
              <p>{c.desc}</p>
              <ul className="cap-tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
