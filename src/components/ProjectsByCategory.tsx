'use client';

import { useEffect } from 'react';
import { projectClasses } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsByCategory() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray<HTMLElement>('.projects-categories .text-mask span').forEach((el) => {
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

      document.querySelectorAll<HTMLElement>('.project-category').forEach((cat) => {
        const cards = cat.querySelectorAll('.gsap-card');
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: cat, start: 'top 85%' },
          }
        );
      });
    };

    run();
  }, []);

  return (
    <section className="projects projects-categories" id="all-projects">
      <div className="projects-category-nav" role="navigation" aria-label="Jump to project category">
        {projectClasses.map((cls) => (
          <a key={cls.key} href={`#${cls.key}`} className="projects-category-nav-link">
            {cls.label}
          </a>
        ))}
      </div>

      {projectClasses.map((cls, idx) => (
        <div className="project-category" id={cls.key} key={cls.key}>
          <div className="project-category-header">
            <span className="project-category-index">{String(idx + 1).padStart(2, '0')}</span>
            <div className="project-category-heading">
              <h2 className="text-mask">
                <span>{cls.label}</span>
              </h2>
              <p style={{ color: 'var(--projects-desc)' }}>
                {cls.projects.length} project{cls.projects.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="project-grid">
            {cls.projects.map((p) => (
              <ProjectCard project={p} category={cls.label} key={`${p.client}-${p.type}`} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
