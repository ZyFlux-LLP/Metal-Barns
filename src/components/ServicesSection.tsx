'use client';

import { useEffect } from 'react';

const services = [
  {
    num: '01',
    title: 'EPC for Steel Structures',
    desc: 'Precision, performance and perfection define our EPC services. Our manufacturing process integrates innovative techniques with stringent quality standards to deliver outstanding steel structures.',
  },
  {
    num: '02',
    title: '360-Degree Compliance',
    desc: 'We ensure full compliance with safety and quality standards, providing peace of mind through every stage of your project.',
  },
  {
    num: '03',
    title: 'Layout Design',
    desc: 'Our design team creates optimized layouts for industrial and logistics facilities, ensuring efficient use of space and resources.',
  },
  {
    num: '04',
    title: 'Innovative Engineering',
    desc: 'Our engineers bring cutting-edge designs and engineering solutions, addressing the most challenging structural requirements with innovation and expertise.',
  },
];

export default function ServicesSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Section header text mask
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

      // Staggered cards
      const cards = document.querySelectorAll('.services-grid .gsap-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.services-grid', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <section className="services" id="services">
      <div className="section-header">
        <h2 className="text-mask">
          <span>Core</span> <span>Capabilities</span>
        </h2>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card gsap-card" key={s.num}>
            <span className="service-num">{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
