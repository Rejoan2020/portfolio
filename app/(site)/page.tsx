import type { Metadata } from 'next';
import Link from 'next/link';
import { ClickCounter } from '@/components/ClickCounter';
import { CalendarDotsIcon, CalendarIcon, GitHubIcon, LinkedInIcon, PersonIcon, PinIcon } from '@/components/icons';
import { LocalClock } from '@/components/LocalClock';
import { ProjectCard } from '@/components/ProjectCard';
import { competitions, education, experience, skills } from '@/content/profile';
import { listedProjects } from '@/content/projects';
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
            A developer interested in the details that make digital products feel effortless. I work across the stack,
            from resilient backends to the small interactions people remember.
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
          {listedProjects.map(project => (
            <ProjectCard key={project.slug} project={project} showCategory />
          ))}
        </div>
      </section>

      <section className="section background" id="background">
        <div className="section-heading">
          <div>
            <h2>
              Experience &amp; background<span className="accent">.</span>
            </h2>
          </div>
        </div>
        <div className="background-grid">
          <article className="background-card" id="experience">
            <div className="card-label">
              <span className="card-symbol">{'->'}</span> EXPERIENCE
            </div>
            {experience.map(job => (
              <div className="editable-entry" key={job.role}>
                <b>
                  {job.role} ·{' '}
                  <a href={job.org.url} {...newTab}>
                    {job.org.name}
                  </a>{' '}
                  · {job.period}
                </b>
                <span>{job.detail}</span>
                <p>{job.summary}</p>
              </div>
            ))}
          </article>
          <article className="background-card" id="education">
            <div className="card-label">
              <span className="card-symbol">▤</span> EDUCATION
            </div>
            {education.map(entry => (
              <div className="editable-entry" key={entry.degree}>
                <b>
                  {entry.degree} · {entry.period}
                </b>
                <span>{entry.school}</span>
                <p>{entry.result}</p>
              </div>
            ))}
          </article>
          <article className="background-card" id="competitions">
            <div className="card-label">
              <span className="card-symbol">✳</span> COMPETITIVE PROGRAMMING
            </div>
            {competitions.map(contest => (
              <div className="editable-entry" key={contest.title}>
                <b>
                  <a href={contest.url} {...newTab}>
                    {contest.title}
                  </a>
                </b>
                <p>{contest.result}</p>
              </div>
            ))}
          </article>
          <article className="background-card" id="skills">
            <div className="card-label">
              <span className="card-symbol">⌘</span> SKILLS
            </div>
            {skills.map(({ group, items }) => (
              <div className="skill-group" key={group}>
                <b>{group}</b>
                <div className="skill-list">
                  {items.map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </article>
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
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.365%2C23.775%2C90.46%2C23.845&layer=mapnik&marker=23.8103%2C90.4125"
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
