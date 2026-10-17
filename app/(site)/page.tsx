import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import bjetLogo from '@/assets/images/logo-bjet.png';
import bracLogo from '@/assets/images/logo-brac-university.png';
import outlierLogo from '@/assets/images/logo-outlier.png';
import { ClickCounter } from '@/components/ClickCounter';
import { CalendarDotsIcon, CalendarIcon, GitHubIcon, LinkedInIcon, PersonIcon, PinIcon } from '@/components/icons';
import { LocalClock } from '@/components/LocalClock';
import { ProjectCard } from '@/components/ProjectCard';
import { featuredProjects } from '@/content/projects';
import { newTab, site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: site.url,
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'BRAC University' },
  sameAs: [site.links.github, site.links.linkedin]
};

const affiliations = [
  { name: 'Outlier', url: 'https://outlier.ai/', note: 'Contract', logo: outlierLogo, shape: 'round' },
  { name: 'B-JET', url: 'https://bjet.org/', note: 'Past', logo: bjetLogo, shape: 'wide' },
  { name: 'BRAC University', url: 'https://www.bracu.ac.bd/', note: 'Alumni', logo: bracLogo, shape: 'tile' }
];

export default function HomePage() {
  return (
    <main id="top">
      <script type="application/ld+json">{JSON.stringify(personJsonLd).replace(/</g, '\\u003c')}</script>

      <section className="hero" id="about">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> INDEPENDENT DEVELOPER <span className="eyebrow-dot">✳</span> 2025—26
          </div>
          <h1>
            Hey, I’m{' '}
            <span className="name-reveal" tabIndex={0} aria-label={site.name}>
              <span className="name-reserve" aria-hidden="true">
                {site.name}
              </span>
              <span className="name-content" aria-hidden="true">
                <span className="name-prefix">Md.&nbsp;</span>
                <span className="name-highlight">Rejoan</span>
                <span className="name-suffix">ur Rahman Apu</span>
              </span>
            </span>
          </h1>
          <p className="hero-body">
            I’m a software engineer based in Dhaka who loves taking products all the way from a rough idea to something
            real people use. I studied CSE at{' '}
            <a className="hero-link" href="https://www.bracu.ac.bd/" {...newTab}>
              BRAC University
            </a>
            , learned Japanese and IT through{' '}
            <a className="hero-link" href="https://bjet.org/" {...newTab}>
              B-JET
            </a>
            , and most recently did contract work with{' '}
            <a className="hero-link" href="https://outlier.ai/" {...newTab}>
              Outlier
            </a>
            , writing and reviewing code to help train AI models. I also love competitive programming. I placed 9th in Bangladesh at{' '}
            <a className="hero-link" href="https://ieeextreme.org/ieeextreme-16-0-ranking/" {...newTab}>
              IEEEXtreme
            </a>
            , came third among BRAC University teams in the{' '}
            <a className="hero-link" href="https://icpc.global/regionals/finder/Dhaka-Preliminary-2024/standings" {...newTab}>
              ICPC
            </a>{' '}
            Dhaka preliminary, and qualified for Round 2 of{' '}
            <a
              className="hero-link"
              href="https://www.facebook.com/codingcompetitions/hacker-cup/2023/certificate/1050620602603679"
              {...newTab}
            >
              Meta Hacker Cup
            </a>
            .
          </p>
          <div className="socials">
            <a href={site.links.github} {...newTab}>
              <GitHubIcon />
              GitHub
            </a>
            <a href={site.links.linkedin} {...newTab}>
              <LinkedInIcon />
              LinkedIn
            </a>
            <Link href="/about">
              <PersonIcon />
              More about me
            </Link>
          </div>
          <ul className="affiliations" aria-label="Where I’ve worked and studied">
            {affiliations.map(org => (
              <li key={org.name}>
                <a href={org.url} {...newTab}>
                  <Image className={`affiliation-logo ${org.shape}`} src={org.logo} alt="" />
                  {org.name}
                  <span className="affiliation-note">({org.note})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="section-heading">
          <div>
            <h2>
              Featured Projects<span className="accent">.</span>
            </h2>
          </div>
          <Link className="text-link all-projects-link" href="/projects">
            <span className="all-projects-label">All projects</span> <span>{'->'}</span>
          </Link>
        </div>
        <div className="project-grid">
          {featuredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} showCategory />
          ))}
        </div>
      </section>

      <section className="contact" id="connect" aria-label="Let's connect">
        <article className="contact-card connect-card">
          <h2>
            <CalendarIcon />
            Let’s Connect
          </h2>
          <p>
            Always open to interesting
            <br className="desktop-break" /> projects and conversations.
          </p>
          <a className="button primary" href={site.links.linkedin} {...newTab}>
            <CalendarDotsIcon />
            Let’s connect
          </a>
        </article>
        <article className="contact-card location-card">
          <h2>
            <PinIcon />
            Currently Based In <span className="map-pin">📍</span>
          </h2>
          <div className="dhaka-map">
            <iframe
              title="Map centered on Dhaka, Bangladesh"
              src="https://www.openstreetmap.org/export/embed.html?bbox=88.9%2C22.5%2C91.9%2C25.0&layer=mapnik&marker=23.8103%2C90.4125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="location-footer">
            <span>{site.location}</span>
            <span>
              ☼ <LocalClock precision="seconds" id="dhaka-clock" />
            </span>
          </div>
        </article>
        <ClickCounter />
      </section>
    </main>
  );
}
