import type { ReactNode } from 'react';
import { SiteChrome } from '@/components/SiteChrome';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return <SiteChrome variant="projects-page">{children}</SiteChrome>;
}
