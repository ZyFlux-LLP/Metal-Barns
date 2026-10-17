'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/data/projects';

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 6.5-9 12-9 12s-9-5.5-9-12a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}

function TonnageIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 7h11l2 13h-15l2-13Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function Slideshow({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={alt}
          className={`project-slide${i === active ? ' is-active' : ''}`}
          loading={i === 0 ? undefined : 'lazy'}
        />
      ))}
      {images.length > 1 && (
        <div className="project-dots">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              className={i === active ? 'is-active' : ''}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function ProjectCard({
  project,
  category,
}: {
  project: Project;
  category?: string;
}) {
  const images = project.imgs ?? (project.img ? [project.img] : []);
  const hasPhoto = images.length > 0;

  return (
    <div className="project-card gsap-card">
      <div className={`project-media${hasPhoto ? '' : ' project-media--logo'}`}>
        {category && <span className="project-chip">{category}</span>}
        {hasPhoto ? (
          <Slideshow images={images} alt={project.client} />
        ) : (
          <div className="project-logo-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.logo} alt={project.client} />
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-type-label">{project.type}</div>
        <div className="project-client">{project.client}</div>
        <div className="project-stats">
          <span><LocationIcon />{project.location}</span>
          <span><AreaIcon />{project.area}</span>
          <span><TonnageIcon />{project.tonnage}</span>
          {project.duration && <span><ClockIcon />{project.duration}</span>}
        </div>
        {project.details && (
          <ul className="project-details">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
        {project.note && (
          <div className="project-note">
            <span className="project-note-mark">&ldquo;</span>
            <span>{project.note}</span>
          </div>
        )}
      </div>
    </div>
  );
}
