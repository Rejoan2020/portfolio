import Image from 'next/image';
import Link from 'next/link';
import { GitHubIcon } from '@/components/icons';
import type { Project } from '@/content/projects';
import { newTab } from '@/lib/site';

type Props = {
  project: Project & { card: NonNullable<Project['card']> };
  showCategory?: boolean;
  /** Eager-load cards that are above the fold. */
  priority?: boolean;
};

export function ProjectCard({ project, showCategory = false, priority = false }: Props) {
  const { card } = project;
  return (
    <article className="project-card">
      <Link className="project-card-main" href={`/projects/${project.slug}`} aria-label={`View ${project.name} project details`}>
        <div className="project-visual image-visual">
          <Image
            src={project.image}
            alt={card.imageAlt}
            sizes="(max-width: 760px) 100vw, 520px"
            preload={priority}
          />
        </div>
        <div className="project-info">
          <h3>{project.name}</h3>
          {showCategory && <span>{card.category}</span>}
        </div>
        <p className="project-description">{card.summary}</p>
        <div className="tags">
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </Link>
      <div className="project-actions">
        <a className="project-action github-action" href={project.repoUrl} {...newTab} title="View source on GitHub">
          <GitHubIcon />
          GitHub
        </a>
        {project.liveUrl && (
          <a className="project-action" href={project.liveUrl} {...newTab} title="View live project">
            Live site <span>{'->'}</span>
          </a>
        )}
      </div>
    </article>
  );
}
