import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Catppuccin Mocha, matching the site's default theme.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#11111b',
          color: '#cdd6f4',
          fontFamily: 'monospace'
        }}
      >
        <div style={{ display: 'flex', fontSize: 36, color: '#cba6f7' }}>~/</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 700 }}>
            Hey, I’m&nbsp;<span style={{ color: '#cba6f7' }}>{site.shortName}</span>
          </div>
          <div style={{ display: 'flex', fontSize: 34, color: '#939ab4' }}>
            {site.role} · {site.location}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#939ab4' }}>Next.js · React · TypeScript · Python</div>
      </div>
    ),
    size
  );
}
