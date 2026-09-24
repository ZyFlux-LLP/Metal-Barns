'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { projectClasses } from '@/data/projects';
import ProjectCard from './ProjectCard';

const featured = projectClasses.map((cls) => cls.projects[0]);

export default function ProjectsSection() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Header text mask
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

      // Fade-up
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

      // Staggered project cards
      const cards = document.querySelectorAll('.project-grid .gsap-card');
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.project-grid', start: 'top 85%' },
        }
      );
    };

    run();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <h2 className="text-mask">
          <span>Project Showcase</span>
        </h2>
        <div className="gsap-fade-up">
          <p style={{ color: 'var(--projects-desc)', marginTop: '1rem' }}>
            A selection of our turnkey engineering and construction achievements across India —
            cold storage, data centres, industrial, medical, commercial, and residential.
          </p>
        </div>
      </div>

      <div className="project-grid">
        {featured.map((p) => (
          <ProjectCard project={p} key={p.client} />
        ))}
      </div>

      <div className="gsap-fade-up" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <Link href="/projects" className="projects-view-all">
          View All Projects →
        </Link>
      </div>
    </section>
  );
}
