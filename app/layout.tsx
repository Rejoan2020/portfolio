import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import type { CSSProperties, ReactNode } from 'react';
import { site } from '@/lib/site';
import { FLAVORS } from '@/lib/theme';
import { getThemePrefs } from '@/lib/theme.server';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  // The automatic fallback is metric-matched to Arial, which suits a monospace face poorly and
  // would also render glyphs outside these subsets (← ↗ ⌘) in Arial instead of the system monospace.
  adjustFontFallback: false,
  fallback: ['monospace']
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Developer`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.links.github }],
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' }
};

export async function generateViewport(): Promise<Viewport> {
  const { flavor } = await getThemePrefs();
  return { themeColor: FLAVORS[flavor].themeColor };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const theme = await getThemePrefs();
  return (
    <html
      lang="en"
      className={mono.variable}
      data-flavor={theme.flavor}
      data-effects={theme.effects ? undefined : 'off'}
      style={theme.accent ? ({ '--accent': theme.accent } as CSSProperties) : undefined}
    >
      <body>{children}</body>
    </html>
  );
}
