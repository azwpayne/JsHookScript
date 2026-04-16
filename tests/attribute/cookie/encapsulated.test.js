import { describe, it, expect, vi } from 'vitest';
import { createCookieEncapsulatedHook } from '../../../src/attribute/cookie/encapsulated.js';

describe('createCookieEncapsulatedHook', () => {
  it('should call onGet and onSet when document.cookie is accessed', () => {
    const onGet = vi.fn();
    const onSet = vi.fn();

    const mockDoc = {};
    Object.defineProperty(mockDoc, 'cookie', {
      get() { return 'x=10'; },
      set() { /* no-op */ },
      configurable: true,
      enumerable: true,
    });

    const originalDoc = globalThis.document;
    vi.stubGlobal('document', mockDoc);

    const hook = createCookieEncapsulatedHook({ onGet, onSet });
    hook.install();

    document.cookie;
    expect(onGet).toHaveBeenCalledWith('x=10');

    document.cookie = 'y=20';
    expect(onSet).toHaveBeenCalledWith('y=20');

    hook.uninstall();
    vi.stubGlobal('document', originalDoc);
  });
});
