import { describe, expect, it, vi } from 'vitest';
import { createCounter, InvalidCountError, parseCount, type CounterStore } from './core';

function memoryStore(initial: unknown = null) {
  let value = initial;
  const store: CounterStore = {
    get: async () => value,
    setIfMissing: async next => {
      if (value === null) value = next;
    },
    incrementIfExists: async () => (value === null ? null : (value = Number(value) + 1))
  };
  return { store, peek: () => value, wipe: () => (value = null) };
}

describe('parseCount', () => {
  it('accepts non-negative integers as numbers or numeric strings', () => {
    expect(parseCount(0)).toBe(0);
    expect(parseCount('42')).toBe(42);
  });

  it.each([-1, 1.5, 'abc', '', null, undefined, {}, Number.MAX_SAFE_INTEGER + 2])('rejects %j', value => {
    expect(() => parseCount(value)).toThrow(InvalidCountError);
  });
});

describe('createCounter', () => {
  it('reads and increments an existing total without touching backups', async () => {
    const { store } = memoryStore(10);
    const latestBackup = vi.fn(async () => 999);
    const counter = createCounter(store, latestBackup);

    expect(await counter.read()).toBe(10);
    expect(await counter.increment()).toBe(11);
    expect(latestBackup).not.toHaveBeenCalled();
  });

  it('restores a lost key from the latest backup on read', async () => {
    const { store, peek } = memoryStore(null);
    const counter = createCounter(store, async () => 250);

    expect(await counter.read()).toBe(250);
    expect(peek()).toBe(250);
  });

  it('restores before incrementing, so the first click after data loss continues the total', async () => {
    const { store } = memoryStore(null);
    const counter = createCounter(store, async () => 250);

    expect(await counter.increment()).toBe(251);
  });

  it('starts from zero when there is no backup', async () => {
    const { store } = memoryStore(null);
    const counter = createCounter(store, async () => 0);

    expect(await counter.increment()).toBe(1);
  });

  it('does not overwrite a total that appeared while restoring', async () => {
    const memory = memoryStore(null);
    const counter = createCounter(memory.store, async () => {
      // Another request restored and clicked in the meantime.
      await memory.store.setIfMissing(300);
      await memory.store.incrementIfExists();
      return 250;
    });

    expect(await counter.increment()).toBe(302);
  });

  it('counts every concurrent click exactly once', async () => {
    const { store, peek } = memoryStore(0);
    const counter = createCounter(store, async () => 0);

    await Promise.all(Array.from({ length: 50 }, () => counter.increment()));
    expect(peek()).toBe(50);
  });

  it('surfaces a corrupt stored value instead of serving it', async () => {
    const { store } = memoryStore('not-a-number');
    await expect(createCounter(store, async () => 0).read()).rejects.toThrow(InvalidCountError);
  });
});
