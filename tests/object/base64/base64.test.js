import { describe, it, expect, beforeEach } from 'vitest';
import { createBase64Hook } from '../../../src/object/base64/base64.js';

describe('createBase64Hook', () => {
  const btoaCalls = [];
  const atobCalls = [];

  beforeEach(() => {
    btoaCalls.length = 0;
    atobCalls.length = 0;
  });

  it('should intercept btoa and return correct result', () => {
    const hook = createBase64Hook({
      onBtoa: (data) => btoaCalls.push(data),
    });
    hook.install();

    const result = btoa('hello');
    expect(result).toBe('aGVsbG8=');
    expect(btoaCalls).toContainEqual('hello');

    hook.uninstall();
  });

  it('should intercept atob and return correct result', () => {
    const hook = createBase64Hook({
      onAtob: (data) => atobCalls.push(data),
    });
    hook.install();

    const result = atob('aGVsbG8=');
    expect(result).toBe('hello');
    expect(atobCalls).toContainEqual('aGVsbG8=');

    hook.uninstall();
  });

  it('should restore originals on uninstall', () => {
    const hook = createBase64Hook({
      onBtoa: (data) => btoaCalls.push(data),
      onAtob: (data) => atobCalls.push(data),
    });
    hook.install();
    hook.uninstall();

    expect(btoa('test')).toBe('dGVzdA==');
    expect(atob('dGVzdA==')).toBe('test');
    expect(btoaCalls).toHaveLength(0);
    expect(atobCalls).toHaveLength(0);
  });
});
