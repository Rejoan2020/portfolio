// Shared by the server (reads cookies to render the right theme) and the client (writes them).
// Palette values live in app/globals.css; only what the server or browser chrome needs is here.

/** `accent` is the flavor's default, as one of the ACCENTS values below. */
export const FLAVORS = {
  latte: { label: 'Latte', accent: '#cba6f7', themeColor: '#e6e9ef' },
  frappe: { label: 'Frappé', accent: '#cba6f7', themeColor: '#232634' },
  macchiato: { label: 'Macchiato', accent: '#f5c2e7', themeColor: '#181926' },
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

/**
 * Accents are stored by their Mocha value but rendered through the active flavor's palette variable
 * (globals.css), so e.g. Pink is Latte's pink on Latte instead of a Mocha pastel on a light page.
 */
export function accentVar(value: string): string {
  const option = ACCENTS.find(accent => accent.value === value);
  return option ? `var(--${option.name.toLowerCase()})` : value;
}

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
