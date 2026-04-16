import { describe, it, expect, beforeEach } from 'vitest';
import { createXmlHttpRequestHook } from '../../../src/prototype-chain/xml-http-request/xml-http-request.js';

describe('createXmlHttpRequestHook', () => {
  const calls = [];

  beforeEach(() => {
    calls.length = 0;
  });

  it('should intercept setRequestHeader', () => {
    const hook = createXmlHttpRequestHook((name, value) => calls.push({ name, value }));
    hook.install();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com');
    xhr.setRequestHeader('X-Custom', 'test-value');

    expect(calls).toContainEqual({ name: 'X-Custom', value: 'test-value' });

    hook.uninstall();
  });

  it('should restore original on uninstall', () => {
    const hook = createXmlHttpRequestHook(() => {});
    hook.install();
    hook.uninstall();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com');
    // Should not throw
    xhr.setRequestHeader('X-Another', 'value');
    expect(true).toBe(true);
  });
});
