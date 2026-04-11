'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scroll during load
    document.body.style.overflow = 'hidden';

    let gsap: typeof import('gsap').gsap | null = null;

    const run = async () => {
      const { gsap: g } = await import('gsap');
      gsap = g;

      const tl = g.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
          sessionStorage.setItem('mbi:loaded', 'true');
          window.dispatchEvent(new CustomEvent('mbi:loaded'));
        },
      });

      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        delay: 0.2,
      })
        .to(
          barRef.current,
          { width: '100%', duration: 1.5, ease: 'power3.inOut' },
          '-=0.2'
        )
        .to(
          [logoRef.current, barRef.current?.parentElement],
          { y: '-100%', opacity: 0, duration: 0.6, ease: 'power3.in' }
        )
        .to(loaderRef.current, { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '-=0.2');
    };

    run();

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="loader-logo-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.webp"
          alt="Metal Barns Logo"
          className="loader-logo"
          ref={logoRef}
          width={250}
          height={70}
        />
      </div>
      <div className="loader-bar-wrapper">
        <div className="loader-bar" ref={barRef} />
      </div>
    </div>
  );
}
