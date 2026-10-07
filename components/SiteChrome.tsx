import type { ReactNode } from 'react';
import { AmbientBackground } from '@/components/AmbientBackground';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { getThemePrefs } from '@/lib/theme.server';

/**
 * Page frame shared by every route group: background layers, header, footer.
 * `variant` is a wrapper class the stylesheet keys page-level layout off (e.g. "projects-page").
 */
export async function SiteChrome({ variant, children }: { variant?: string; children: ReactNode }) {
  const theme = await getThemePrefs();
  const shell = (
    <div className="shell">
      <SiteHeader theme={theme} />
      {children}
      <SiteFooter />
    </div>
  );
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <AmbientBackground />
      {variant ? <div className={variant}>{shell}</div> : shell}
    </>
  );
}
