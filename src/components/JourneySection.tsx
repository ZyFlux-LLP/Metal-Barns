'use client';

import { useEffect } from 'react';

const timeline = [
  {
    year: 'Oct 2014',
    title: 'Inception',
    desc: 'Started as a Fabricator of PEB Structures with a dedicated core team.',
    team: '19',
  },
  {
    year: 'Oct 2015',
    title: 'Capacity Upgrade',
    desc: 'Successfully expanded fabrication capabilities to handle larger scale projects.',
    team: '25',
  },
  {
    year: 'Oct 2016',
    title: 'In-House Erection',
    desc: 'Transitioned into a complete Steel Building provider with our own dedicated erection team.',
    team: '30',
  },
  {
    year: 'Oct 2017',
    title: 'Service Expansion',
    desc: 'Officially established as a comprehensive Steel Building & Services Provider.',
    team: '59',
  },
  {
    year: 'Oct 2018',
    title: 'Solutions Provider',
    desc: 'Became an integrated Solutions Provider for advanced Steel Buildings.',
    team: '70',
  },
  {
    year: 'Oct 2020',
    title: 'Advanced Optimization',
    desc: 'Focused on Critical Building Design & Optimization for highly complex structural engineering.',
    team: '83',
  },
  {
    year: 'Oct 2021',
    title: 'Scaling Operations',
    desc: 'Experienced continued aggressive growth in both project volume and workforce capacity.',
    team: '100+',
  },
  {
    year: 'Oct 2022',
    title: 'Comprehensive Turnkey',
    desc: 'Began offering fully integrated turnkey solutions with comprehensive end-to-end services.',
    team: '100+',
  },
  {
    year: 'Oct 2023',
    title: 'Mastery of Civil & Steel',
    desc: 'Delivering the ultimate Turnkey Solution — seamlessly managing both Steel and Civil structural requirements.',
    team: '276+',
  },
];

export default function JourneySection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Fade-up header
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

      // Draw timeline line
      gsap.to('#timeline-progress', {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: true,
        },
      });

      // Reveal each item
      document.querySelectorAll<HTMLElement>('.timeline-element').forEach((item) => {
        const content = item.querySelector('.timeline-content');

        gsap.to(content, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 75%' },
        });

        ScrollTrigger.create({
          trigger: item,
          start: 'top 50%',
          onEnter: () => item.classList.add('active'),
          onLeaveBack: () => item.classList.remove('active'),
        });
      });
    };

    run();
  }, []);

  return (
    <section className="journey" id="journey">
      <div className="journey-header">
        <h2 className="gsap-fade-up">Over 10 Years Journey of Excellence Since 2014</h2>
        <p className="gsap-fade-up">
          Discover the remarkable journey of Metal Barns India over the past decade. Our commitment
          to innovation, quality, and customer satisfaction has driven our growth from a small
          fabricator to a leading provider of turnkey solutions in the steel building industry.
        </p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line-bg" />
        <div className="timeline-progress" id="timeline-progress" />

        {timeline.map((item) => (
          <div className="timeline-item timeline-element" key={item.year}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-year">{item.year}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              <p className="timeline-team">Team Size: {item.team}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
