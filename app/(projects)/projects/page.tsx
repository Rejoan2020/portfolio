import type { Metadata } from 'next';
import { FolderIcon } from '@/components/icons';
import { ProjectCard } from '@/components/ProjectCard';
import { listedProjects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects: Zoinpark, a crypto rewards platform; Jajabor, a travel guide to Bangladesh; and MedSimAi, an AI-powered medical simulation platform.',
  alternates: { canonical: '/projects' }
};

export default function ProjectsPage() {
  return (
    <main id="top">
      <section className="section projects" id="projects">
        <div className="section-heading">
          <div>
            <h2>
              <FolderIcon className="projects-heading-icon" />
              Projects
            </h2>
          </div>
        </div>
        <div className="project-grid">
          {listedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 2} />
          ))}
        </div>
      </section>
    </main>
  );
}
