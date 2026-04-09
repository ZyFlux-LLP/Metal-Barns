'use client';

import { useEffect } from 'react';

export default function AboutSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Text mask reveals
      gsap.utils.toArray<HTMLElement>('section .text-mask span').forEach((el) => {
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

      // Fade-up blocks
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

      // About image parallax
      gsap.to('.parallax-img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-image-wrapper',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    };

    run();
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-content">
        <h2 className="text-mask">
          <span>Leading the</span>
          <br />
          <span>Future of</span>
          <br />
          <span style={{ color: 'var(--brand-blue)' }}>Steel Solutions.</span>
        </h2>
        <div className="gsap-fade-up" style={{ marginTop: '2rem' }}>
          <p className="about-text">
            Metal Barns India (MBI) is a leading provider of innovative structural and services
            solutions, established in October 2014. Our team comprises professionals with over 42
            years of experience in manufacturing, engineering, operations, and sales from large
            corporate firms.
          </p>
          <p className="about-text">
            Our Vision: To be the number one provider of innovative structural and services solutions
            for SMEs in India. We believe in producing time-managed, well-engineered, and honest
            steel structures.
          </p>
          <div className="about-iso">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/iso-9001.png" alt="ISO 9001:2015 Certified" />
            <span>ISO 9001:2015 Certified</span>
          </div>
        </div>
      </div>

      <div className="about-image-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/factory-interior.jpg"
          alt="MBI factory floor with overhead crane and steel plates"
          className="parallax-img"
        />
      </div>
    </section>
  );
}
