'use client';

import { useEffect, useRef } from 'react';

const clips = [
  { src: '/factory/overhead-crane.webm', title: 'Overhead Cranes', desc: 'Gantry cranes moving heavy steel across the bay.' },
  { src: '/factory/welding.webm', title: 'Structural Welding', desc: 'Skilled welders joining primary members by hand.' },
  { src: '/factory/grinding.webm', title: 'Finishing & Grinding', desc: 'Edges and joints dressed to spec before dispatch.' },
  { src: '/factory/plasma-cutting.webm', title: 'CNC Plasma Cutting', desc: 'Steel plates profiled with machine precision.' },
  { src: '/factory/beam-lifting.webm', title: 'Beam Handling', desc: 'Fabricated sections lifted and staged for assembly.' },
  { src: '/factory/crane-bay.webm', title: 'Fabrication Bay', desc: 'Our Metal Barns shop floor, built for scale.' },
];

export default function FactoryFloorSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Play clips only while visible to save bandwidth and CPU.
  useEffect(() => {
    const videos = gridRef.current?.querySelectorAll('video');
    if (!videos) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        });
      },
      { threshold: 0.35 }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <section className="factory-floor" id="factory">
      <div className="section-header">
        <h2>Inside Our Factory</h2>
        <p style={{ color: '#aaa', marginTop: '1rem' }}>
          Live from the shop floor: cutting, welding and handling steel every day.
        </p>
      </div>

      <div className="factory-grid" ref={gridRef}>
        {clips.map((c) => (
          <figure className="factory-card" key={c.src}>
            <video src={c.src} muted loop playsInline preload="metadata" aria-label={c.title} />
            <figcaption>
              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
