import { jajabor } from './jajabor';
import { medsimai } from './medsimai';
import { zoinpark } from './zoinpark';
import type { Project } from './types';

export type { Project } from './types';

/** All project pages, in display order. */
export const projects: Project[] = [jajabor, zoinpark, medsimai];

/** Projects that appear in the home and /projects listings. */
export const listedProjects = projects.filter(
  (project): project is Project & { card: NonNullable<Project['card']> } => Boolean(project.card)
);

/** Listed projects that also appear in the home page's Featured Projects section. */
export const featuredProjects = listedProjects.filter(project => project.featured);

export function getProject(slug: string) {
  return projects.find(project => project.slug === slug);
}
