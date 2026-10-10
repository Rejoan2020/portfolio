import type { NextConfig } from 'next';

// Slugs that used to live at the site root (/zoinpark, /zoinpark.html) before /projects/[slug].
const legacyProjectSlugs = ['zoinpark', 'medsimai'];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    // The Content-Security-Policy header is set per request in proxy.ts because it carries a nonce.
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
        ]
      }
    ];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/projects.html', destination: '/projects', permanent: true },
      ...legacyProjectSlugs.flatMap(slug => [
        { source: `/${slug}`, destination: `/projects/${slug}`, permanent: true },
        { source: `/${slug}.html`, destination: `/projects/${slug}`, permanent: true }
      ])
    ];
  }
};

export default nextConfig;
