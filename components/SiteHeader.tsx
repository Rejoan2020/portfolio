'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ThemeControls } from '@/components/ThemeControls';
import { newTab, site } from '@/lib/site';
import type { ThemePrefs } from '@/lib/theme';

/** The terminal-style breadcrumb next to the home link, e.g. "~/projects/zoinpark/". */
function crumbFor(pathname: string) {
  if (pathname === '/') return '~/';
  if (pathname === '/about') return '~/About';
  if (pathname === '/projects') return '~/Projects';
  return `~${pathname}/`;
}

export function SiteHeader({ theme }: { theme: ThemePrefs }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const openDrawer = () => {
    setMenuOpen(false);
    setDrawerOpen(true);
  };
  const closeDrawer = (restoreFocus: boolean) => {
    setDrawerOpen(false);
    if (restoreFocus) moreTriggerRef.current?.focus();
  };
  const closeAll = () => {
    setMenuOpen(false);
    setDrawerOpen(false);
  };

  useEffect(() => {
    document.body.classList.toggle('drawer-open', drawerOpen);
    if (drawerOpen) drawerCloseRef.current?.focus();
  }, [drawerOpen]);

  useEffect(() => {
    if (!menuOpen && !drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (drawerOpen) {
        setDrawerOpen(false);
        moreTriggerRef.current?.focus();
      } else {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (menuOpen && !headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen, drawerOpen]);

  const aboutActive = pathname === '/about';
  const projectsActive = pathname.startsWith('/projects');

  return (
    <header className="topbar" ref={headerRef}>
      <Link className="brand home-prompt" href="/" aria-label="Home" onClick={closeAll}>
        <span className="brand-mark">{crumbFor(pathname)}</span>
        <span className="nav-cursor" aria-hidden="true">
          ▍
        </span>
      </Link>
      <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
        <Link className={aboutActive ? 'active' : undefined} href="/about" onClick={closeAll}>
          About
        </Link>
        <Link className={projectsActive ? 'active' : undefined} href="/projects" onClick={closeAll}>
          Projects
        </Link>
        <button
          ref={moreTriggerRef}
          className="more-trigger"
          type="button"
          aria-expanded={drawerOpen}
          aria-controls="site-navigation"
          onClick={openDrawer}
        >
          More...
        </button>
      </nav>
      <div className="drawer-backdrop" hidden={!drawerOpen} onClick={() => closeDrawer(false)} />
      <aside
        className={drawerOpen ? 'more-menu open' : 'more-menu'}
        id="site-navigation"
        aria-label="Navigation"
        aria-hidden={!drawerOpen}
        inert={!drawerOpen}
      >
        <div className="drawer-heading">
          <strong>Navigation</strong>
          <button
            ref={drawerCloseRef}
            className="drawer-close"
            type="button"
            aria-label="Close navigation"
            onClick={() => closeDrawer(true)}
          >
            ×
          </button>
        </div>
        <ThemeControls initial={theme} />
        <nav className="drawer-links" aria-label="More navigation">
          <Link href="/about" onClick={closeAll}>
            About
          </Link>
          <Link href="/projects" onClick={closeAll}>
            Projects
          </Link>
          <Link href="/" onClick={closeAll}>
            Home
          </Link>
          <div className="drawer-divider">
            <span>MORE</span>
          </div>
          <a href={site.links.github} {...newTab}>
            GitHub
          </a>
          <a href={site.links.linkedin} {...newTab}>
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
        </nav>
      </aside>
      <button
        ref={menuButtonRef}
        className="menu-button"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
