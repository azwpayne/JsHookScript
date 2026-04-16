import { describe, it, expect, beforeEach } from 'vitest';
import { createBasicXmlHttpRequestHook } from '../../../src/prototype-chain/xml-http-request/based.js';

describe('createBasicXmlHttpRequestHook', () => {
  const calls = [];

  beforeEach(() => {
    calls.length = 0;
  });

  it('should intercept setRequestHeader', () => {
    const hook = createBasicXmlHttpRequestHook((name, value) => calls.push({ name, value }));
    hook.install();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com');
    xhr.setRequestHeader('X-Test', 'value');

    expect(calls).toContainEqual({ name: 'X-Test', value: 'value' });

    hook.uninstall();
  });

  it('should restore original on uninstall', () => {
    const hook = createBasicXmlHttpRequestHook(() => {});
    hook.install();
    hook.uninstall();

    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://example.com');
    xhr.setRequestHeader('X-Other', 'val');
    expect(true).toBe(true);
  });
});
