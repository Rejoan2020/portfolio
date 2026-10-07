import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DateIcon, DocumentIcon, GitHubIcon, TagIcon } from '@/components/icons';
import { getProject, projects } from '@/content/projects';
import { newTab } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.name, description: project.description, images: [project.image.src] }
  };
}

const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC' });

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const own = project.ownership === 'own';

  return (
    <main id="top" className="project-detail-main">
      <article className={own ? 'anubis-detail project-detail' : 'anubis-detail'}>
        <Link className="detail-back" href="/projects">
          <span aria-hidden="true">←</span> All projects
        </Link>
        <figure className="anubis-preview">
          <Image
            src={project.image}
            alt={project.imageAlt}
            sizes="(max-width: 900px) 100vw, 900px"
            preload
            unoptimized={project.image.src.endsWith('.svg')}
          />
        </figure>
        <header className="detail-header">
          <h1>{project.name}</h1>
          <div className="detail-meta">
            {project.date && (
              <span className="detail-date">
                <DateIcon />
                <time dateTime={project.date}>{dateFormat.format(new Date(project.date))}</time>
              </span>
            )}
            <a href={project.repoUrl} {...newTab} aria-label={`${project.name} source on GitHub`} title="GitHub">
              <span>GitHub</span>
              <GitHubIcon />
            </a>
            {project.docsUrl && (
              <a href={project.docsUrl} {...newTab} aria-label={`${project.name} documentation`} title="Documentation">
                <span>Documentation</span>
                <DocumentIcon />
              </a>
            )}
            {project.liveUrl && (
              <a className="detail-live-link" href={project.liveUrl} {...newTab}>
                Live site <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          <div className="detail-tags" aria-label={own ? 'Technology' : 'Project tags'}>
            <TagIcon className="tag-icon" />
            {project.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="detail-context">{project.context}</p>
        </header>
        <div className="detail-rule" />
        <div className="detail-content">{project.body}</div>
      </article>
    </main>
  );
}
