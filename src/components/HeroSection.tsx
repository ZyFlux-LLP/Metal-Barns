'use client';

import { useEffect, useRef } from 'react';
import { Component as EtherealShadow } from '@/components/ui/etheral-shadow';

const stats = [
  { target: 10, suffix: '+', label: 'Years Experience' },
  { target: 25, suffix: '+', label: 'Corporate Clients' },
  { target: 280, suffix: '+', label: 'Team Members' },
  { target: 15, suffix: 'L+', label: 'Sq. Ft. Area Built' },
  { target: 104, suffix: '', label: 'Acres PEB' },
];

export default function HeroSection() {
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP animations — triggered by mbi:loaded event from Loader
  useEffect(() => {
    let outerCleanup: (() => void) | undefined;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const handler = () => {
        const tl = gsap.timeline();

        tl.fromTo(
            '.hero-title span',
            { y: '110%' },
            { y: '0%', duration: 1.2, stagger: 0.15, ease: 'power4.out' }
          )
          .fromTo(
            '.hero-bottom span',
            { y: '110%' },
            { y: '0%', duration: 1, stagger: 0.2, ease: 'power3.out' },
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

        outerCleanup = () => tl.kill();
      };

      window.addEventListener('mbi:loaded', handler);

      return () => {
        window.removeEventListener('mbi:loaded', handler);
        outerCleanup?.();
      };
    };

    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });

    return () => cleanup?.();
  }, []);

  // Both modes: rgba(128,128,128,1) is the component default and what the reference uses.
  // The background (white or black) handles the contrast — we don't need a different color.
  const shadowColor = 'rgba(128, 128, 128, 1)';

  return (
    <header className="hero">
      {/* Ethereal Shadow Background */}
      <div className="hero-shadow-bg">
        <EtherealShadow
          color={shadowColor}
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        />
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
