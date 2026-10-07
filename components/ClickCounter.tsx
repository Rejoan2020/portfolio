'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const ENDPOINT = '/api/clicks';
const PERSONAL_KEY = 'rejoan-portfolio-click-me-count';

// --- This visitor's own clicks, kept in localStorage --------------------------------------------

const personalListeners = new Set<() => void>();

function readPersonal() {
  try {
    return Number.parseInt(localStorage.getItem(PERSONAL_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

function bumpPersonal() {
  try {
    localStorage.setItem(PERSONAL_KEY, String(readPersonal() + 1));
  } catch {}
  personalListeners.forEach(listener => listener());
}

function subscribePersonal(listener: () => void) {
  personalListeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    personalListeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

// --- Shared total ------------------------------------------------------------------------------

type Status = 'ok' | 'unavailable' | 'rate-limited';

class CounterError extends Error {
  constructor(readonly status: Exclude<Status, 'ok'>) {
    super(status);
  }
}

async function requestCount(method: 'GET' | 'POST') {
  const response = await fetch(ENDPOINT, { method, headers: { Accept: 'application/json' }, cache: 'no-store' });
  if (response.status === 429) throw new CounterError('rate-limited');
  if (!response.ok) throw new CounterError('unavailable');
  const { count } = (await response.json()) as { count?: unknown };
  if (typeof count !== 'number' || !Number.isSafeInteger(count) || count < 0) throw new CounterError('unavailable');
  return count;
}

const messages: Record<Exclude<Status, 'ok'>, string> = {
  unavailable: 'Shared count is unavailable right now; your clicks still count here.',
  'rate-limited': 'Easy there — too many clicks. Try again in a moment.'
};

export function ClickCounter() {
  const personal = useSyncExternalStore(subscribePersonal, readPersonal, () => 0);
  // The last total the server confirmed, plus clicks still in flight, is what we show.
  const [confirmed, setConfirmed] = useState<number | null>(null);
  const [pending, setPending] = useState(0);
  const [status, setStatus] = useState<Status>('ok');
  const [infoOpen, setInfoOpen] = useState(false);
  // Responses can arrive out of order; only the newest request may set the confirmed total.
  const latestRequest = useRef(0);
  const latestApplied = useRef(0);

  const applyCount = (requestId: number, count: number) => {
    if (requestId < latestApplied.current) return;
    latestApplied.current = requestId;
    setConfirmed(count);
    setStatus('ok');
  };

  useEffect(() => {
    const requestId = ++latestRequest.current;
    requestCount('GET')
      .then(count => applyCount(requestId, count))
      .catch((error: unknown) => setStatus(error instanceof CounterError ? error.status : 'unavailable'));
  }, []);

  const click = () => {
    bumpPersonal();
    setPending(count => count + 1);
    const requestId = ++latestRequest.current;
    requestCount('POST')
      .then(count => applyCount(requestId, count))
      .catch((error: unknown) => setStatus(error instanceof CounterError ? error.status : 'unavailable'))
      .finally(() => setPending(count => count - 1));
  };

  const total = confirmed === null ? null : confirmed + pending;

  return (
    <article className="contact-card click-card">
      <button
        type="button"
        className="counter-info"
        aria-label="About this counter"
        aria-describedby="counter-info-tip"
        aria-expanded={infoOpen}
        onClick={() => setInfoOpen(open => !open)}
        onBlur={() => setInfoOpen(false)}
      >
        i
      </button>
      <span className="counter-tooltip" id="counter-info-tip" role="tooltip">
        Everyone’s clicks add to one shared total, stored in this site’s database with daily backups.
      </span>
      <output className="global-click-count" aria-live="polite">
        {total === null ? '—' : total.toLocaleString('en-US')}
      </output>
      <button className="click-me-button" type="button" onClick={click}>
        Click me
      </button>
      <p className="personal-click-count" aria-live="polite">
        You’ve clicked {personal} {personal === 1 ? 'time' : 'times'}
      </p>
      <span className="counter-error" role="status" hidden={status === 'ok'}>
        {status === 'ok' ? '' : messages[status]}
      </span>
    </article>
  );
}
