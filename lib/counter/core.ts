/** Storage operations the counter needs. Each one is a single atomic round trip. */
export interface CounterStore {
  /** Raw stored value, or null when the key is missing. */
  get(): Promise<unknown>;
  /** Write `value` only if the key does not exist yet. */
  setIfMissing(value: number): Promise<void>;
  /** Increment and return the new value, or null (without creating the key) when it is missing. */
  incrementIfExists(): Promise<unknown>;
}

export interface Counter {
  read(): Promise<number>;
  increment(): Promise<number>;
}

export class InvalidCountError extends Error {
  constructor(value: unknown) {
    super(`Counter value is invalid: ${String(value)}`);
  }
}

export function parseCount(value: unknown): number {
  const count = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
  if (typeof count !== 'number' || !Number.isSafeInteger(count) || count < 0) throw new InvalidCountError(value);
  return count;
}

/**
 * A durable click counter. If the store loses its key (e.g. Redis was flushed), the next read or
 * increment seeds it from the latest backup before continuing, so the total never resets to zero.
 */
export function createCounter(store: CounterStore, latestBackup: () => Promise<number>): Counter {
  async function restore() {
    await store.setIfMissing(await latestBackup());
    const restored = await store.get();
    if (restored === null) throw new Error('Counter could not be restored');
    return parseCount(restored);
  }

  return {
    async read() {
      const value = await store.get();
      return value === null ? restore() : parseCount(value);
    },
    async increment() {
      const value = await store.incrementIfExists();
      if (value !== null) return parseCount(value);
      await restore();
      const retried = await store.incrementIfExists();
      if (retried === null) throw new Error('Counter disappeared during restore');
      return parseCount(retried);
    }
  };
}
