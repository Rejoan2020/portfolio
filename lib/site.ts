export const site = {
  name: 'Md. Rejoanur Rahman Apu',
  shortName: 'Rejoan',
  role: 'Software Engineer',
  description:
    'Md. Rejoanur Rahman Apu is a full-stack software engineer in Dhaka, Bangladesh, building with Next.js, React, TypeScript and Python.',
  location: 'Dhaka, Bangladesh',
  timeZone: 'Asia/Dhaka',
  email: 'rejoan523@gmail.com',
  links: {
    github: 'https://github.com/Rejoan2020',
    linkedin: 'https://www.linkedin.com/in/rejoan-rahman/',
    strava: 'https://www.strava.com/athletes/958201866'
  },
  url: siteUrl()
} as const;

function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return 'http://localhost:3000';
}

/** Props for links that open in a new tab without handing the opener to the target page. */
export const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const;
