'use client';

import { useEffect } from 'react';

const machines = [
  {
    img: '/machinery/spiro-tornado.webp',
    name: 'Spiro-Tornado CNC Welder',
    desc: 'Automated submerged arc welding system for precision beam fabrication at scale.',
  },
  {
    img: '/machinery/laser-cutter.webp',
    name: 'WinArc Laser Cutting System',
    desc: 'High-speed fiber laser cutting for precise steel plate and section profiling.',
  },
  {
    img: '/machinery/shearing-machine.webp',
    name: 'EnergyMission Hydraulic Shear',
    desc: 'Heavy-duty hydraulic plate shearing for high-volume steel sheet processing.',
  },
  {
    img: '/machinery/bolt-lathe.webp',
    name: 'Bolt Threading Lathe',
    desc: 'Precision bolt and rod threading for structural connection hardware.',
  },
  {
    img: '/machinery/punch-machine.jpg',
    name: 'BMI Multi Steelworker',
    desc: 'Combined punch, shear, and notch machine for structural steel processing.',
  },
  {
    img: '/machinery/robot-welding.webp',
    name: 'Robotic Welding Arm',
    desc: 'Yaskawa robotic welder delivering consistent, high-quality weld seams at speed.',
  },
  {
    img: '/machinery/purlin-forming.jpg',
    name: 'C-Purlin Roll Former',
    desc: 'Roll forming machine producing precision C & Z purlins for roofing and cladding systems.',
  },
];

export default function MachinerySection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>('.machinery .text-mask span').forEach((el) => {
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

      gsap.utils.toArray<HTMLElement>('.machinery .gsap-fade-up').forEach((el) => {
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

      const cards = document.querySelectorAll('.machinery-grid .gsap-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.machinery-grid', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <section className="machinery" id="machinery">
      <div className="section-header">
        <h2 className="text-mask">
          <span>Our</span> <span>Machinery</span>
        </h2>
        <div className="gsap-fade-up">
          <p style={{ color: '#aaa', marginTop: '1rem' }}>
            In-house fabrication equipment ensuring precision, quality, and delivery at scale.
          </p>
        </div>
      </div>

      <div className="machinery-grid">
        {machines.map((m) => (
          <div className="machinery-card gsap-card" key={m.name}>
            <div className="machinery-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.name} />
            </div>
            <div className="machinery-content">
              <h4>{m.name}</h4>
              <p>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
