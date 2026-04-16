import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createEvalHook } from '../../../src/object/eval/eval.js';

describe('createEvalHook', () => {
  const calls = [];
  const logger = (source) => calls.push(source);

  beforeEach(() => {
    calls.length = 0;
  });

  afterEach(() => {
    calls.length = 0;
  });

  it('should intercept eval and log the source', () => {
    const hook = createEvalHook(logger);
    hook.install();

    const result = eval('1 + 1');
    expect(result).toBe(2);
    expect(calls).toContain('1 + 1');

    hook.uninstall();
  });

  it('should restore original eval on uninstall', () => {
    const hook = createEvalHook(logger);
    hook.install();
    hook.uninstall();

    const result = eval('2 + 2');
    expect(result).toBe(4);
    expect(calls).not.toContain('2 + 2');
  });

  it('should report installation state correctly', () => {
    const hook = createEvalHook(logger);
    expect(hook.isInstalled()).toBe(false);
    hook.install();
    expect(hook.isInstalled()).toBe(true);
    hook.uninstall();
    expect(hook.isInstalled()).toBe(false);
  });
});
