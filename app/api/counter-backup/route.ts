import { timingSafeEqual } from 'node:crypto';
import { getCounter, saveSnapshot } from '@/lib/counter';

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get('authorization') ?? '');
  return received.length === expected.length && timingSafeEqual(received, expected);
}

/** Daily snapshot of the click total to private Blob storage, triggered by Vercel Cron (vercel.json). */
export async function GET(request: Request) {
  if (!authorized(request)) return new Response('Unauthorized', { status: 401 });

  try {
    const snapshot = await saveSnapshot(await getCounter().read());
    return Response.json({ ok: true, count: snapshot.total, capturedAt: snapshot.capturedAt });
  } catch (error) {
    console.error('Daily click-counter backup failed:', error instanceof Error ? error.message : error);
    return new Response('Backup failed', { status: 500 });
  }
}
