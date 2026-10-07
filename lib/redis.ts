import { Redis } from '@upstash/redis';

let redis: Redis | undefined;

/** Upstash Redis client. Accepts both Upstash's own variable names and the Vercel KV aliases. */
export function getRedis() {
  if (!redis) {
    const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
    if (!url || !token) throw new Error('Upstash Redis environment variables are missing');
    redis = new Redis({ url, token });
  }
  return redis;
}
