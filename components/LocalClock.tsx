'use client';

import { useSyncExternalStore } from 'react';
import { site } from '@/lib/site';

const formatters = {
  seconds: new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }),
  minutes: new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timeZone, hour: '2-digit', minute: '2-digit', hour12: false
  })
};

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

/** Current time in Dhaka. Renders a placeholder on the server so hydration never mismatches. */
export function LocalClock({ precision, id }: { precision: 'seconds' | 'minutes'; id?: string }) {
  const placeholder = precision === 'seconds' ? '--:--:--' : '--:--';
  const time = useSyncExternalStore(subscribe, () => formatters[precision].format(Date.now()), () => placeholder);
  return <time id={id}>{time}</time>;
}
