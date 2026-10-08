'use client';

import { useState } from 'react';
import { ACCENTS, accentVar, COOKIES, FLAVORS, type Flavor, type ThemePrefs } from '@/lib/theme';

const ONE_YEAR = 60 * 60 * 24 * 365;

function persist(name: string, value: string | null) {
  document.cookie = value === null
    ? `${name}=; path=/; max-age=0; SameSite=Lax`
    : `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR}; SameSite=Lax`;
}

function applyFlavor(flavor: Flavor) {
  document.documentElement.dataset.flavor = flavor;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', FLAVORS[flavor].themeColor);
  persist(COOKIES.flavor, flavor);
}

function applyAccent(accent: string) {
  document.documentElement.style.setProperty('--accent', accentVar(accent));
  persist(COOKIES.accent, accent);
}

function applyEffects(on: boolean) {
  if (on) delete document.documentElement.dataset.effects;
  else document.documentElement.dataset.effects = 'off';
  persist(COOKIES.effects, on ? null : 'off');
}

/**
 * Applies theme choices straight to <html> (flavors are CSS, see globals.css) and stores them in
 * cookies so the server renders the same theme on the next request — no flash on load.
 */
export function ThemeControls({ initial }: { initial: ThemePrefs }) {
  const [flavor, setFlavor] = useState(initial.flavor);
  const [accent, setAccent] = useState(initial.accent);
  const [effects, setEffects] = useState(initial.effects);
  const shownAccent = accent ?? FLAVORS[flavor].accent;

  function chooseFlavor(next: Flavor) {
    setFlavor(next);
    applyFlavor(next);
  }

  function chooseAccent(next: string) {
    setAccent(next);
    applyAccent(next);
  }

  function toggleEffects(on: boolean) {
    setEffects(on);
    applyEffects(on);
  }

  return (
    <div className="drawer-settings">
      <div className="drawer-section-label">
        <span aria-hidden="true">◉</span> Theme
      </div>
      <div className="theme-popover drawer-theme">
        <span className="popover-title">COLOR THEME</span>
        <div className="theme-options" role="group" aria-label="Color theme">
          {(Object.keys(FLAVORS) as Flavor[]).map(name => (
            <button
              key={name}
              type="button"
              data-theme={name}
              className={name === flavor ? 'selected' : undefined}
              aria-pressed={name === flavor}
              onClick={() => chooseFlavor(name)}
            >
              <i /> {FLAVORS[name].label}
            </button>
          ))}
        </div>
        <span className="popover-title accent-title">ACCENT COLOR</span>
        <div className="accent-options" role="group" aria-label="Accent color">
          {ACCENTS.map(option => (
            <button
              key={option.value}
              type="button"
              aria-label={option.name}
              title={option.name}
              className={option.value === shownAccent ? 'selected' : undefined}
              aria-pressed={option.value === shownAccent}
              style={{ backgroundColor: accentVar(option.value) }}
              onClick={() => chooseAccent(option.value)}
            />
          ))}
        </div>
        <label className="effect-toggle">
          <input type="checkbox" checked={effects} onChange={event => toggleEffects(event.target.checked)} />{' '}
          Background effect: <span className="effect-state">{effects ? 'on' : 'off'}</span>
        </label>
      </div>
    </div>
  );
}
