import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false }
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>404</h1>
        <p>That page isn’t here.</p>
        <Link href="/">
          Back to home <span aria-hidden="true">{'->'}</span>
        </Link>
      </div>
    </main>
  );
}
