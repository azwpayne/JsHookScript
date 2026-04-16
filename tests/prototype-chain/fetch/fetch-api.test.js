import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createFetchHook } from '../../../src/prototype-chain/fetch/fetch-api.js';

describe('createFetchHook', () => {
  const requests = [];
  const responses = [];

  beforeEach(() => {
    requests.length = 0;
    responses.length = 0;
  });

  it('should intercept fetch requests', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    );

    const hook = createFetchHook({
      onRequest: (url) => requests.push(url),
      onResponse: (res) => responses.push(res.status),
    });
    hook.install();

    const res = await fetch('https://api.example.com/data');
    expect(res.status).toBe(200);
    expect(requests).toContain('https://api.example.com/data');
    expect(responses).toContain(200);

    hook.uninstall();
  });

  it('should pass through responses with null body unchanged', async () => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(null, {
          status: 204,
          statusText: 'No Content',
        })
      )
    );

    const hook = createFetchHook({
      onRequest: (url) => requests.push(url),
    });
    hook.install();

    const res = await fetch('https://api.example.com/empty', { method: 'HEAD' });
    expect(res.status).toBe(204);
    expect(res.body).toBe(null);

    hook.uninstall();
  });

  it('should restore original fetch on uninstall', async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = vi.fn(() => Promise.resolve(new Response('ok')));

    const hook = createFetchHook({
      onRequest: (url) => requests.push(url),
    });
    hook.install();
    hook.uninstall();

    await fetch('https://example.com');
    expect(requests).toHaveLength(0);
    globalThis.fetch = originalFetch;
  });
});
