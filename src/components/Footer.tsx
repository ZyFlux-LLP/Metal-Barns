'use client';

import { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Footer CTA text mask reveal
      gsap.utils.toArray<HTMLElement>('.footer-cta span').forEach((el) => {
        gsap.fromTo(
          el,
          { y: '110%' },
          {
            y: '0%',
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: { trigger: el.closest('.footer-cta'), start: 'top 90%' },
          }
        );
      });

      // Footer contact blocks staggered fade-up
      const blocks = gsap.utils.toArray<HTMLElement>('.footer-contact.gsap-fade-up');
      gsap.fromTo(
        blocks,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-top', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <footer id="contact">
      <div className="footer-top">
        <div>
          <h2 className="footer-cta text-mask">
            <span>Build</span> <span>With</span>
            <br />
            <span style={{ color: 'var(--brand-blue)' }}>MBI.</span>
          </h2>
        </div>

        <div className="footer-contact gsap-fade-up">
          <h4>Registered Office</h4>
          <p>
            W 12/12 MIDC, Hingna Road Area,
            <br />
            Nagpur - 440016, Maharashtra
          </p>
          <a href="tel:+917620044077" style={{ display: 'block' }}>+91 76200 44077</a>
          <a href="mailto:info@metalbarns.in" style={{ display: 'block', fontSize: '1rem' }}>
            info@metalbarns.in
          </a>
        </div>

        <div className="footer-contact gsap-fade-up">
          <h4>Unit II</h4>
          <p>
            Plot No 613-616, Near Mohpa ST Bus Stand,
            <br />
            Kalmeshwar Saoner Road,
            <br />
            District - Nagpur
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Metal Barns India. ISO 9001:2015 Certified.</p>
      </div>
    </footer>
  );
}
