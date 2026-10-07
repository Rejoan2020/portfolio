import type { Redis } from '@upstash/redis';
import type { CounterStore } from './core';

// INCR would silently create a missing key at 1 and skip backup recovery, so check first — atomically.
const INCREMENT_IF_EXISTS = `
if redis.call('EXISTS', KEYS[1]) == 1 then
  return redis.call('INCR', KEYS[1])
end
return false`;

export function redisCounterStore(redis: Redis, key: string): CounterStore {
  return {
    get: () => redis.get(key),
    async setIfMissing(value) {
      await redis.set(key, value, { nx: true });
    },
    incrementIfExists: () => redis.eval(INCREMENT_IF_EXISTS, [key], [])
  };
}
