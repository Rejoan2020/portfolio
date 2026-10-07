// Shared by the server (reads cookies to render the right theme) and the client (writes them).
// Palette values live in app/globals.css; only what the server or browser chrome needs is here.

export const FLAVORS = {
  latte: { label: 'Latte', accent: '#8839ef', themeColor: '#eff1f5' },
  frappe: { label: 'Frappé', accent: '#ca9ee6', themeColor: '#303446' },
  macchiato: { label: 'Macchiato', accent: '#f5bde6', themeColor: '#24273a' },
  mocha: { label: 'Mocha', accent: '#cba6f7', themeColor: '#11111b' }
} as const;

export type Flavor = keyof typeof FLAVORS;

export const DEFAULT_FLAVOR: Flavor = 'mocha';

export const ACCENTS = [
  { name: 'Rosewater', value: '#f5e0dc' },
  { name: 'Flamingo', value: '#f2cdcd' },
  { name: 'Pink', value: '#f5c2e7' },
  { name: 'Mauve', value: '#cba6f7' },
  { name: 'Red', value: '#f38ba8' },
  { name: 'Maroon', value: '#eba0ac' },
  { name: 'Peach', value: '#fab387' },
  { name: 'Yellow', value: '#f9e2af' },
  { name: 'Green', value: '#a6e3a1' },
  { name: 'Teal', value: '#94e2d5' },
  { name: 'Sky', value: '#89dceb' },
  { name: 'Sapphire', value: '#74c7ec' },
  { name: 'Blue', value: '#89b4fa' },
  { name: 'Lavender', value: '#b4befe' }
] as const;

export const COOKIES = {
  flavor: 'theme',
  accent: 'accent',
  effects: 'effects'
} as const;

export type ThemePrefs = {
  flavor: Flavor;
  /** A user-picked accent, or null to use the flavor's own. */
  accent: string | null;
  effects: boolean;
};

/** Cookie values are untrusted input that ends up in a style attribute, so only known values pass. */
export function parseThemePrefs(read: (name: string) => string | undefined): ThemePrefs {
  const flavor = read(COOKIES.flavor);
  const accent = read(COOKIES.accent);
  return {
    flavor: flavor && Object.hasOwn(FLAVORS, flavor) ? (flavor as Flavor) : DEFAULT_FLAVOR,
    accent: ACCENTS.some(option => option.value === accent) ? accent! : null,
    effects: read(COOKIES.effects) !== 'off'
  };
}
