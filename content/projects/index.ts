import { anubis } from './anubis';
import { medsimai } from './medsimai';
import { zoinpark } from './zoinpark';
import type { Project } from './types';

export type { Project } from './types';

/** All project pages, in display order. */
export const projects: Project[] = [zoinpark, medsimai, anubis];

/** Projects that appear in the home and /projects listings. */
export const listedProjects = projects.filter(
  (project): project is Project & { card: NonNullable<Project['card']> } => Boolean(project.card)
);

export function getProject(slug: string) {
  return projects.find(project => project.slug === slug);
}
