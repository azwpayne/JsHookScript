import { describe, it, expect, beforeEach } from 'vitest';
import { createJsonStringifyHook } from '../../../src/object/json/json-stringify.js';

describe('createJsonStringifyHook', () => {
  const stringifyCalls = [];
  const parseCalls = [];

  beforeEach(() => {
    stringifyCalls.length = 0;
    parseCalls.length = 0;
  });

  it('should call onStringify when JSON.stringify is used', () => {
    const hook = createJsonStringifyHook({
      onStringify: (value) => stringifyCalls.push(value),
    });
    hook.install();

    JSON.stringify({ x: 1 });
    expect(stringifyCalls).toContainEqual({ x: 1 });

    hook.uninstall();
  });

  it('should call onParse when JSON.parse is used', () => {
    const hook = createJsonStringifyHook({
      onParse: (text) => parseCalls.push(text),
    });
    hook.install();

    JSON.parse('{"y":2}');
    expect(parseCalls).toContainEqual('{"y":2}');

    hook.uninstall();
  });

  it('should restore both methods on uninstall', () => {
    const hook = createJsonStringifyHook({
      onStringify: (value) => stringifyCalls.push(value),
      onParse: (text) => parseCalls.push(text),
    });
    hook.install();
    hook.uninstall();

    JSON.stringify({ z: 3 });
    JSON.parse('{"w":4}');
    expect(stringifyCalls).toHaveLength(0);
    expect(parseCalls).toHaveLength(0);
  });
});
