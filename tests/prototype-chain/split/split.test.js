import { describe, it, expect, beforeEach } from 'vitest';
import { createSplitHook } from '../../../src/prototype-chain/split/split.js';

describe('createSplitHook', () => {
  const calls = [];

  beforeEach(() => {
    calls.length = 0;
  });

  it('should intercept String.prototype.split', () => {
    const hook = createSplitHook((separator, limit) => calls.push({ separator, limit }));
    hook.install();

    const result = 'a,b,c'.split(',');
    expect(result).toEqual(['a', 'b', 'c']);
    expect(calls).toContainEqual({ separator: ',', limit: undefined });

    hook.uninstall();
  });

  it('should handle limit argument', () => {
    const hook = createSplitHook((separator, limit) => calls.push({ separator, limit }));
    hook.install();

    const result = 'a,b,c'.split(',', 2);
    expect(result).toEqual(['a', 'b']);
    expect(calls).toContainEqual({ separator: ',', limit: 2 });

    hook.uninstall();
  });

  it('should restore original split on uninstall', () => {
    const hook = createSplitHook(() => {});
    hook.install();
    hook.uninstall();

    expect('x-y'.split('-')).toEqual(['x', 'y']);
  });
});
