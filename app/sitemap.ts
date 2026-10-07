import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/about', '/projects', ...projects.map(({ slug }) => `/projects/${slug}`)];
  return paths.map(path => ({ url: new URL(path, site.url).toString() }));
}
