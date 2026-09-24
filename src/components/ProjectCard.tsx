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

export default function ProjectCard({
  project,
  category,
  featured,
}: {
  project: Project;
  category?: string;
  featured?: boolean;
}) {
  const hasPhoto = Boolean(project.img);

  return (
    <div className={`project-card gsap-card${featured ? ' project-card--featured' : ''}`}>
      <div className={`project-media${hasPhoto ? '' : ' project-media--logo'}`}>
        {category && <span className="project-chip">{category}</span>}
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.img} alt={project.client} />
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
        </div>
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
