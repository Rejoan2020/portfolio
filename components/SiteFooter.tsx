import { LocalClock } from '@/components/LocalClock';
import { newTab, site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-topline">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-separator">-</span>
        <span className="footer-clock">
          <span aria-hidden="true">◷</span> <LocalClock precision="minutes" id="footer-clock" />
        </span>
        <span className="footer-separator">-</span>
        <span>Based in {site.location}</span>
      </div>
      <div className="footer-bottomline">
        <span className="footer-status">
          <i aria-hidden="true" /> Open to interesting projects and conversations
        </span>
        <nav className="footer-socials" aria-label="Social links">
          <a href={site.links.github} {...newTab}>
            GitHub
          </a>
          <a href={site.links.linkedin} {...newTab}>
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
