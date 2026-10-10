import type { Metadata } from 'next';
import Link from 'next/link';
import { ClickCounter } from '@/components/ClickCounter';
import { CalendarDotsIcon, CalendarIcon, GitHubIcon, LinkedInIcon, PersonIcon, PinIcon } from '@/components/icons';
import { LocalClock } from '@/components/LocalClock';
import { ProjectCard } from '@/components/ProjectCard';
import { competitions, education, experience, skills } from '@/content/profile';
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
          {featuredProjects.map(project => (
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
            <h3 className="card-label">
              <span className="card-symbol">{'->'}</span> Experience
            </h3>
            <ol className="timeline">
              {experience.map(job => (
                <li className="timeline-item" key={job.role}>
                  <div className="entry-head">
                    <h4>{job.role}</h4>
                    <span className="entry-period">{job.period}</span>
                  </div>
                  <div className="entry-meta">
                    <a href={job.org.url} {...newTab}>
                      {job.org.name}
                    </a>
                    <span>{job.detail}</span>
                  </div>
                  <p>{job.summary}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="background-card" id="education">
            <h3 className="card-label">
              <span className="card-symbol">▤</span> Education
            </h3>
            <ol className="timeline">
              {education.map(entry => (
                <li className="timeline-item" key={entry.degree}>
                  <div className="entry-head">
                    <h4>{entry.degree}</h4>
                    <span className="entry-period">{entry.period}</span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-org">{entry.school}</span>
                    <span>{entry.result}</span>
                  </div>
                </li>
              ))}
            </ol>
          </article>
          <article className="background-card" id="competitions">
            <h3 className="card-label">
              <span className="card-symbol">✳</span> Competitive programming
            </h3>
            <ol className="timeline">
              {competitions.map(contest => (
                <li className="timeline-item" key={contest.name}>
                  <div className="entry-head">
                    <h4>
                      <a className="entry-title-link" href={contest.url} {...newTab}>
                        {contest.name}
                      </a>
                    </h4>
                    <span className="entry-period">{contest.date}</span>
                  </div>
                  <div className="entry-meta">
                    <span className="entry-org">{contest.highlight}</span>
                  </div>
                  <p>{contest.result}</p>
                </li>
              ))}
            </ol>
          </article>
          <article className="background-card" id="skills">
            <h3 className="card-label">
              <span className="card-symbol">⌘</span> Skills
            </h3>
            <dl className="skill-groups">
              {skills.map(({ group, items }) => (
                <div className="skill-group" key={group}>
                  <dt>{group}</dt>
                  <dd>
                    <ul className="skill-list">
                      {items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
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
