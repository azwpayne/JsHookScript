import { describe, it, expect, vi } from 'vitest';
import { createCookieBasedHook } from '../../../src/attribute/cookie/based.js';

describe('createCookieBasedHook', () => {
  it('should trigger onTrigger when cookie value contains trigger substring', () => {
    const onTrigger = vi.fn();

    const mockDoc = {};
    Object.defineProperty(mockDoc, 'cookie', {
      get() { return ''; },
      set() { /* no-op */ },
      configurable: true,
      enumerable: true,
    });

    const originalDoc = globalThis.document;
    vi.stubGlobal('document', mockDoc);

    const hook = createCookieBasedHook({
      trigger: 'secret',
      onTrigger,
    });
    hook.install();

    document.cookie = 'token=secret123';
    expect(onTrigger).toHaveBeenCalledWith('token=secret123');

    document.cookie = 'token=public';
    expect(onTrigger).toHaveBeenCalledTimes(1);

    hook.uninstall();
    vi.stubGlobal('document', originalDoc);
  });
});
