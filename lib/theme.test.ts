import { describe, expect, it } from 'vitest';
import { COOKIES, DEFAULT_FLAVOR, parseThemePrefs } from './theme';

const from = (cookies: Record<string, string>) => (name: string) => cookies[name];

describe('parseThemePrefs', () => {
  it('defaults when no cookies are set', () => {
    expect(parseThemePrefs(from({}))).toEqual({ flavor: DEFAULT_FLAVOR, accent: null, effects: true });
  });

  it('reads valid preferences', () => {
    const prefs = parseThemePrefs(
      from({ [COOKIES.flavor]: 'latte', [COOKIES.accent]: '#a6e3a1', [COOKIES.effects]: 'off' })
    );
    expect(prefs).toEqual({ flavor: 'latte', accent: '#a6e3a1', effects: false });
  });

  it('ignores values outside the allow-lists (they end up in a style attribute)', () => {
    const prefs = parseThemePrefs(
      from({ [COOKIES.flavor]: 'toString', [COOKIES.accent]: 'red;background:url(//evil)' })
    );
    expect(prefs.flavor).toBe(DEFAULT_FLAVOR);
    expect(prefs.accent).toBeNull();
  });
});
