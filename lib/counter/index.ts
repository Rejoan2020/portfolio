import { getRedis } from '@/lib/redis';
import { latestSnapshotTotal } from './backups';
import { createCounter, type Counter } from './core';
import { redisCounterStore } from './redis-store';

export { saveSnapshot } from './backups';

const COUNTER_KEY = 'rejoan-portfolio:click-me';

let counter: Counter | undefined;

/** Created on first use so builds and pages never need the storage credentials. */
export function getCounter() {
  counter ??= createCounter(redisCounterStore(getRedis(), COUNTER_KEY), latestSnapshotTotal);
  return counter;
}
