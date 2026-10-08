import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import runBeach from '@/assets/images/morning-run-beach.jpg';
import runGroupWarmup from '@/assets/images/morning-run-group-warmup.jpg';
import walkBoardwalk from '@/assets/images/morning-walk-boardwalk.webp';
import portrait from '@/assets/images/rejoan-portrait.jpg';
import { GitHubIcon, LinkedInIcon, MailIcon, RunIcon, StravaIcon } from '@/components/icons';
import { newTab, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name}: a software engineer in Dhaka building web applications with JavaScript, TypeScript, React, Next.js and Python.`,
  alternates: { canonical: '/about' }
};

// `position` keeps the person in frame when the photo is cropped to the grid's 16:9 tiles.
const runPhotos = [
  { src: walkBoardwalk, alt: 'Morning walk on a lakeside boardwalk', position: 'center 55%' },
  { src: runGroupWarmup, alt: 'Group warm-up lunges before a morning run', position: 'center 60%' },
  { src: runBeach, alt: 'Running barefoot along the beach on a cloudy morning', position: 'center 45%' }
];

export default function AboutPage() {
  return (
    <main id="top">
      <section className="about-page" id="about">
        <h1>About Me</h1>
        <div className="about-profile">
          <figure className="about-portrait">
            <Image src={portrait} alt={site.name} sizes="(max-width: 760px) 100vw, 340px" placeholder="blur" preload />
          </figure>
          <div className="about-copy">
            <p>
              Hey! I’m {site.name}, a software engineer based in {site.location}. I enjoy turning thoughtful ideas into
              useful, carefully crafted web applications.
            </p>
            <p>
              Some of my recent work includes <Link href="/projects/zoinpark">Zoinpark</Link>, a crypto rewards
              platform, and <Link href="/projects/medsimai">MedSimAI</Link>, a clinical simulation platform for medical
              students. I build with JavaScript, TypeScript, React, Next.js, and Python.
            </p>
            <p>
              I studied Computer Science and Engineering at BRAC University. My experience also includes AI data
              training at Outlier and the Bangladesh-Japan ICT Engineers’ Training Program. I’ve taken part in
              programming contests including Meta Hacker Cup, Google Code Jam, and ICPC regional preliminaries.
            </p>
            <div className="socials about-socials">
              <a href={site.links.github} {...newTab}>
                <GitHubIcon />
                GitHub
              </a>
              <a href={site.links.linkedin} {...newTab}>
                <LinkedInIcon />
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`}>
                <MailIcon />
                Email
              </a>
            </div>
          </div>
        </div>
        <section className="about-runs" aria-labelledby="morning-runs">
          <h2 id="morning-runs">
            <RunIcon />
            Morning Runs
          </h2>
          <p>
            Most days start with a morning walk or run before I get into code.{' '}
            <a href={site.links.strava} {...newTab}>
              <StravaIcon />
              Follow along on Strava
            </a>
          </p>
          <div className="about-runs-grid">
            {runPhotos.map((photo) => (
              <figure key={photo.alt}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  sizes="(max-width: 639px) 100vw, 340px"
                  placeholder="blur"
                  style={{ objectPosition: photo.position }}
                />
              </figure>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
