'use client';

import { useEffect, useRef, useState } from 'react';

const highlights = [
  {
    image: '/highlights-food-park.jpg',
    areaValue: '20',
    areaUnit: 'Acres',
    title: 'Complete Food Park',
    scope: 'Steel and civil design, steel supply and commissioning',
    built: 'Factory Buildings, Cold Storages, Warehouses, Multi Storeyed Building, Utility Building, Load Bearing Mezzanine Structures',
    tonnage: '2,500+ Tons',
    time: '2.5 years',
  },
  {
    image: '/highlights-kirti.jpg',
    areaValue: '15',
    areaUnit: 'Acres, 6 spread locations',
    title: 'Turnkey PEB Solution',
    scope: 'Turnkey PEB solution',
    built: [
      'Steel Building',
      'Solvent Plants: 40,000 sq ft x 6 nos, 672 tons',
      'Machine Platforms: 12 m x 6 nos, 726 tons',
      'Agri Commodity Warehouse: 93,000 sq ft x 6 nos, 1,320 tons',
    ],
    tonnage: '2,718+ Tons',
    time: '11 months',
  },
];

export default function HighlightsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let kill: (() => void) | undefined;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) =>
          setActive(Math.min(highlights.length - 1, Math.floor(self.progress * highlights.length))),
      });
      kill = () => st.kill();
    };
    run();
    return () => kill?.();
  }, []);

  return (
    <section
      className="highlights"
      aria-label="Highlights"
      ref={ref}
      style={{ height: `${highlights.length * 100}vh` }}
    >
      <div className="hl-sticky">
        <div className="hl-media">
          {highlights.map((h, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={h.title}
              src={h.image}
              alt={h.title}
              className={`hl-img${i <= active ? ' is-shown' : ''}${i === active ? ' is-active' : ''}`}
              style={{ zIndex: i }}
            />
          ))}
        </div>
        <div className="hl-content">
          <span className="section-eyebrow">Highlights</span>
          <div className="hl-stack">
            {highlights.map((h, i) => (
              <div className={`hl-text${i === active ? ' is-active' : i < active ? ' is-past' : ''}`} key={h.title}>
                <h3>{h.title}</h3>
                <div className="hl-area">
                  <strong>{h.areaValue}</strong> {h.areaUnit}
                </div>
                <dl>
                  <dt>Scope</dt>
                  <dd>{h.scope}</dd>
                  <dt>Asset built</dt>
                  <dd>
                    {Array.isArray(h.built) ? (
                      <ul>
                        {h.built.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      h.built
                    )}
                  </dd>
                  <dt>Project tonnage</dt>
                  <dd>{h.tonnage}</dd>
                  <dt>Time period</dt>
                  <dd>{h.time}</dd>
                </dl>
              </div>
            ))}
          </div>
          <div className="hl-progress">
            {highlights.map((h, i) => (
              <span key={h.title} className={i === active ? 'is-active' : ''}>
                {String(i + 1).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
