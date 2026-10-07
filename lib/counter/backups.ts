import { get, list, put } from '@vercel/blob';
import { parseCount } from './core';

const PREFIX = 'click-counter/';

type Snapshot = { name: string; total: number; capturedAt: string };

/** Writes a private, timestamped snapshot of the total to Vercel Blob. */
export async function saveSnapshot(total: number) {
  const capturedAt = new Date().toISOString();
  const snapshot: Snapshot = { name: 'click-me', total, capturedAt };
  await put(`${PREFIX}${capturedAt.replace(/[:.]/g, '-')}.json`, JSON.stringify(snapshot), {
    access: 'private',
    addRandomSuffix: true,
    contentType: 'application/json'
  });
  return snapshot;
}

/** Total from the most recent snapshot, or 0 when there are none. */
export async function latestSnapshotTotal(): Promise<number> {
  let latest: { pathname: string; uploadedAt: Date } | null = null;
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: PREFIX, limit: 1000, cursor });
    for (const blob of page.blobs) {
      if (!latest || blob.uploadedAt > latest.uploadedAt) latest = blob;
    }
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  if (!latest) return 0;
  const result = await get(latest.pathname, { access: 'private' });
  if (!result?.stream) return 0;
  const snapshot = JSON.parse(await new Response(result.stream).text()) as Partial<Snapshot>;
  return parseCount(snapshot.total);
}
