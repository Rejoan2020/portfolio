import { getCounter } from '@/lib/counter';
import { clickLimiter, clientIp } from '@/lib/rate-limit';

const noStore = { 'Cache-Control': 'no-store, max-age=0' };

function json(body: unknown, status = 200, headers: HeadersInit = {}) {
  return Response.json(body, { status, headers: { ...noStore, ...headers } });
}

function unavailable(error: unknown) {
  console.error('Click counter request failed:', error instanceof Error ? error.message : error);
  return json({ error: 'Counter storage is temporarily unavailable' }, 503);
}

export async function GET() {
  try {
    return json({ count: await getCounter().read() });
  } catch (error) {
    return unavailable(error);
  }
}

export async function POST(request: Request) {
  // Browsers always send Origin on POST; this keeps other sites' pages from clicking for their visitors.
  if (request.headers.get('origin') !== new URL(request.url).origin) {
    return json({ error: 'Cross-origin increments are not allowed' }, 403);
  }

  try {
    const { success, reset } = await clickLimiter().limit(clientIp(request));
    if (!success) {
      const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
      return json({ error: 'Too many clicks, slow down' }, 429, { 'Retry-After': String(retryAfter) });
    }
    return json({ count: await getCounter().increment() });
  } catch (error) {
    return unavailable(error);
  }
}
