import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type Project = {
  slug: string;
  name: string;
  /** Meta description for the detail page. */
  description: string;
  /** Present for projects shown in listings. Without it the page is reachable by URL only. */
  card?: {
    category: string;
    summary: string;
    imageAlt: string;
  };
  /** Also shown in the home page's Featured Projects section. Requires `card`. */
  featured?: boolean;
  image: StaticImageData;
  imageAlt: string;
  tags: string[];
  repoUrl: string;
  liveUrl?: string;
  docsUrl?: string;
  /** ISO date shown in the detail header. */
  date?: string;
  context: ReactNode;
  body: ReactNode;
};
