'use client';

import { useEffect, useRef, useState } from 'react';

const slides = [
  { src: '/hero-construction-sunset.jpg', alt: 'Steel structure erection at sunset' },
  { src: '/factory-interior.jpg', alt: 'MBI factory floor with overhead crane' },
  { src: '/hero-slide-2.webp', alt: 'Industrial Facility' },
  { src: '/hero-slide-3.webp', alt: 'Massive Factory Exterior' },
];

const stats = [
  { target: 10, suffix: '+', label: 'Years Experience' },
  { target: 25, suffix: '+', label: 'Corporate Clients' },
  { target: 280, suffix: '+', label: 'Team Members' },
  { target: 15, suffix: 'L+', label: 'Sq. Ft. Area Built' },
  { target: 104, suffix: '', label: 'Acres PEB' },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // GSAP animations
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({ delay: 3.2 });

      tl.to('.hero-title span', {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
      })
        .to(
          '.hero-bottom span',
          { y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
          '-=0.8'
        )
        .to(
          '.hero-stat',
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          '-=0.6'
        )
        .add(() => {
          stats.forEach((s, i) => {
            const el = statRefs.current[i];
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: s.target,
              duration: 2,
              ease: 'power3.out',
              onUpdate() {
                el.textContent = Math.floor(obj.val).toString();
              },
            });
          });
        }, '-=0.4');

      cleanup = () => tl.kill();
    };

    run();
    return () => cleanup?.();
  }, []);

  return (
    <header className="hero">
      {/* Slideshow */}
      <div className="hero-slideshow">
        {slides.map((slide, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`hero-slide${i === currentSlide ? ' active' : ''}`}
          />
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content-wrapper">
        <div className="hero-line">
          <h1 className="hero-title text-mask">
            <span>STRUCTURAL</span>
          </h1>
        </div>
        <div className="hero-line">
          <h1 className="hero-title text-mask">
            <span>EXCELLENCE</span>
          </h1>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div className="hero-stat" key={s.label}>
              <h3>
                <span
                  className="counter"
                  ref={(el) => {
                    statRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {s.suffix}
              </h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <div className="hero-bottom">
          <div className="text-mask">
            <span className="hero-subtitle">
              Delivering project-managed, cost-effective, and ROI-capable steel buildings to our
              customers. ISO 9001: 2015 Certified.
            </span>
          </div>
          <div className="text-mask">
            <span className="scroll-indicator">[ Scroll to Explore ]</span>
          </div>
        </div>
      </div>
    </header>
  );
}
