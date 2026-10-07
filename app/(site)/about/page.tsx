import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import portrait from '@/assets/images/rejoan-portrait.jpg';
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/icons';
import { newTab, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${site.name}: a software engineer in Dhaka building web applications with JavaScript, TypeScript, React, Next.js and Python.`,
  alternates: { canonical: '/about' }
};

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
      </section>
    </main>
  );
}
