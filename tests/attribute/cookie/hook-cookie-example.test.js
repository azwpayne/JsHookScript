import { describe, it, expect, vi } from 'vitest';
import { createCookieExampleHook } from '../../../src/attribute/cookie/hook-cookie-example.js';

describe('createCookieExampleHook', () => {
  it('should parse, merge, and serialize cookies correctly', () => {
    const onGet = vi.fn();
    const onSet = vi.fn();

    const mockDoc = {};
    Object.defineProperty(mockDoc, 'cookie', {
      get() { return 'existing=value'; },
      set() { /* no-op */ },
      configurable: true,
      enumerable: true,
    });

    const originalDoc = globalThis.document;
    vi.stubGlobal('document', mockDoc);

    const hook = createCookieExampleHook({ onGet, onSet });
    hook.install();

    document.cookie = 'new=cookie; path=/';
    expect(onSet).toHaveBeenCalledWith('new=cookie; path=/');

    const result = document.cookie;
    expect(onGet).toHaveBeenCalledWith('existing=value');
    expect(result).toContain('existing=value');
    expect(result).toContain('new=cookie');

    // Updating an existing key should replace it
    document.cookie = 'new=updated; path=/';
    const updated = document.cookie;
    expect(updated).toContain('new=updated');
    expect(updated).not.toContain('new=cookie');

    hook.uninstall();
    vi.stubGlobal('document', originalDoc);
  });
});
