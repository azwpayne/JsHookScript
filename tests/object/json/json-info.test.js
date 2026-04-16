import { describe, it, expect, beforeEach } from 'vitest';
import { createJsonInfoHook } from '../../../src/object/json/json-info.js';

describe('createJsonInfoHook', () => {
  const calls = [];
  const logger = (op, val) => calls.push({ op, val });

  beforeEach(() => {
    calls.length = 0;
  });

  it('should intercept JSON.stringify', () => {
    const hook = createJsonInfoHook(logger);
    hook.install();

    const result = JSON.stringify({ a: 1 });
    expect(result).toBe('{"a":1}');
    expect(calls).toContainEqual({ op: 'json_stringify', val: { a: 1 } });

    hook.uninstall();
  });

  it('should intercept JSON.parse', () => {
    const hook = createJsonInfoHook(logger);
    hook.install();

    const result = JSON.parse('{"b":2}');
    expect(result).toEqual({ b: 2 });
    expect(calls).toContainEqual({ op: 'json_parse', val: '{"b":2}' });

    hook.uninstall();
  });

  it('should restore originals on uninstall', () => {
    const hook = createJsonInfoHook(logger);
    hook.install();
    hook.uninstall();

    const str = JSON.stringify({ c: 3 });
    expect(str).toBe('{"c":3}');
    expect(calls).toHaveLength(0);
  });
});
