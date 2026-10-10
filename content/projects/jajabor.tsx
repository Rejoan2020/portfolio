import image from '@/assets/images/jajabor-home.webp';
import { newTab } from '@/lib/site';
import type { Project } from './types';

export const jajabor: Project = {
  slug: 'jajabor',
  name: 'Jajabor',
  description:
    'A free, honest guide to travelling in Bangladesh, with destination guides and stories written by real travellers.',
  card: {
    category: 'TRAVEL GUIDE',
    summary:
      'A free, honest guide to travelling in Bangladesh, with destination guides and stories written by real travellers.',
    imageAlt: 'Jajabor home page with a destination search bar above photos of Bangladeshi landscapes'
  },
  featured: true,
  image,
  imageAlt: 'Jajabor home page headline, destination search, and a strip of Bangladesh travel photos',
  tags: ['Next.js', 'React', 'Payload CMS', 'Better Auth', 'MongoDB', 'Cloudinary', 'Tailwind CSS'],
  repoUrl: 'https://github.com/MacroKite/jajabor',
  liveUrl: 'https://jajabor.vercel.app',
  context: 'Team project · Travel guide for Bangladesh · Web application',
  body: (
    <>
      <h2>Jajabor</h2>
      <p>
        A free, honest guide to travelling in Bangladesh. Every destination guide and story is written by people who
        have actually been there.
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Destination guides:</strong> Browse destinations and filter between popular spots and hidden gems.
        </li>
        <li>
          <strong>Traveller stories:</strong> Signed-in users write and publish their own trip stories with photo
          uploads.
        </li>
        <li>
          <strong>Traveller profiles:</strong> Each author has a public profile, and can manage their stories from
          their account.
        </li>
        <li>
          <strong>Editable content:</strong> Destinations, photos, and static pages are managed through Payload CMS.
        </li>
        <li>
          <strong>Accounts:</strong> Sign in with Google or with email and password.
        </li>
        <li>
          <strong>Responsive layouts:</strong> Designed for phone, tablet, and desktop.
        </li>
      </ul>
      <h2>Team</h2>
      <ul>
        <li>
          <strong>Me:</strong> Planning and full-stack development.
        </li>
        <li>
          <strong>
            <a href="https://www.linkedin.com/in/abdullahalmaruf1/" {...newTab}>
              Maruf
            </a>
            :
          </strong>{' '}
          Planning and UI/UX design.
        </li>
      </ul>
      <h2>Built With</h2>
      <p>
        Next.js (App Router), React, Payload CMS, Better Auth, MongoDB with Mongoose, Cloudinary, and Tailwind CSS,
        deployed on Vercel.
      </p>
    </>
  )
};
