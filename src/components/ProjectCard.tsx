import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card gsap-card">
      <div className={`project-img-wrapper${project.img ? '' : ' project-img-wrapper--logo'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.img ?? project.logo} alt={project.client} />
      </div>
      <div className="project-content">
        <div className="project-client">{project.client}</div>
        <div className="project-desc">{project.type}</div>
        <div className="project-stats">
          <span>{project.location}</span>
          <span>{project.area}</span>
          <span>{project.tonnage}</span>
        </div>
        {project.note && <div className="project-note">{project.note}</div>}
      </div>
    </div>
  );
}
