import { cookies } from 'next/headers';
import { cache } from 'react';
import { parseThemePrefs } from './theme';

/** Theme preferences from the request cookies, so the first paint already has the right theme. */
export const getThemePrefs = cache(async () => {
  const store = await cookies();
  return parseThemePrefs(name => store.get(name)?.value);
});
