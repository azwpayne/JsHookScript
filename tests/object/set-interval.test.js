import { describe, it, expect, beforeEach } from 'vitest';
import { createSetIntervalHook } from '../../src/object/set-interval.js';

describe('createSetIntervalHook', () => {
  const blocks = [];

  beforeEach(() => {
    blocks.length = 0;
  });

  it('should return null for debugger-containing string callbacks', () => {
    const hook = createSetIntervalHook({ onBlock: (cb) => blocks.push(cb) });
    hook.install();

    const id = setInterval('debugger;', 1000);
    expect(id).toBe(null);
    expect(blocks).toContain('debugger;');

    hook.uninstall();
  });

  it('should return null for debugger-containing function callbacks', () => {
    const hook = createSetIntervalHook({ onBlock: (cb) => blocks.push(cb) });
    hook.install();

    // eslint-disable-next-line no-debugger
    const id = setInterval(function () { debugger; }, 1000);
    expect(id).toBe(null);
    expect(blocks).toHaveLength(1);

    hook.uninstall();
  });

  it('should return a numeric id for normal callbacks', () => {
    const hook = createSetIntervalHook({ onBlock: (cb) => blocks.push(cb) });
    hook.install();

    const id = setInterval(() => {}, 1000);
    expect(id).not.toBeNull();
    expect(id).toBeDefined();
    clearInterval(id);
    expect(blocks).toHaveLength(0);

    hook.uninstall();
  });

  it('should restore original setInterval on uninstall', () => {
    const hook = createSetIntervalHook({ onBlock: (cb) => blocks.push(cb) });
    hook.install();
    hook.uninstall();

    const id = setInterval(() => {}, 1000);
    expect(id).not.toBeNull();
    expect(id).toBeDefined();
    clearInterval(id);
  });
});
