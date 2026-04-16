import { describe, it, expect, vi } from 'vitest';
import { createCookieBaseHook } from '../../../src/attribute/cookie/base.js';

describe('createCookieBaseHook', () => {
  it('should call onGet and onSet when document.cookie is accessed', () => {
    const onGet = vi.fn();
    const onSet = vi.fn();

    const mockDoc = {};
    Object.defineProperty(mockDoc, 'cookie', {
      get() { return 'a=1'; },
      set() { /* no-op */ },
      configurable: true,
      enumerable: true,
    });

    const originalDoc = globalThis.document;
    vi.stubGlobal('document', mockDoc);

    const hook = createCookieBaseHook({ onGet, onSet });
    hook.install();

    document.cookie;
    expect(onGet).toHaveBeenCalledWith('a=1');

    document.cookie = 'b=2';
    expect(onSet).toHaveBeenCalledWith('b=2');

    hook.uninstall();
    vi.stubGlobal('document', originalDoc);
  });
});
