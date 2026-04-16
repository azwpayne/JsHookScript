import { describe, it, expect, beforeEach } from 'vitest';
import { createFunctionHook } from '../../src/object/function.js';

describe('createFunctionHook', () => {
  const blocks = [];

  beforeEach(() => {
    blocks.length = 0;
  });

  it('should return null when Function body is "debugger"', () => {
    const hook = createFunctionHook({ onBlock: (body) => blocks.push(body) });
    hook.install();

    const fn = Function.prototype.constructor.call(Function, 'debugger');
    expect(fn).toBe(null);
    expect(blocks).toContain('debugger');

    hook.uninstall();
  });

  it('should allow normal function creation', () => {
    const hook = createFunctionHook({ onBlock: (body) => blocks.push(body) });
    hook.install();

    const fn = Function.prototype.constructor.call(Function, 'a', 'b', 'return a + b');
    expect(fn(2, 3)).toBe(5);
    expect(blocks).toHaveLength(0);

    hook.uninstall();
  });

  it('should restore original constructor on uninstall', () => {
    const hook = createFunctionHook({ onBlock: (body) => blocks.push(body) });
    hook.install();
    hook.uninstall();

    const fn = Function.prototype.constructor.call(Function, 'return 42');
    expect(fn()).toBe(42);
    expect(blocks).toHaveLength(0);
  });
});
