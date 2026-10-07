import { Ratelimit } from '@upstash/ratelimit';
import { getRedis } from '@/lib/redis';

let limiter: Ratelimit | undefined;

/** 20 clicks per 10 seconds per visitor: plenty for a human, a wall for a script. */
export function clickLimiter() {
  limiter ??= new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(20, '10 s'),
    prefix: 'rejoan-portfolio:ratelimit:clicks',
    ephemeralCache: new Map()
  });
  return limiter;
}

/** Client IP as reported by the platform proxy (Vercel sets x-forwarded-for / x-real-ip). */
export function clientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}
