import { describe, it, expect } from 'vitest';
import * as index from '../src/index.js';

describe('src/index.js barrel exports', () => {
  it('should export all hook factories', () => {
    expect(typeof index.createMethodHook).toBe('function');
    expect(typeof index.createPropertyHook).toBe('function');
    expect(typeof index.createEvalHook).toBe('function');
    expect(typeof index.createJsonInfoHook).toBe('function');
    expect(typeof index.createJsonStringifyHook).toBe('function');
    expect(typeof index.createFunctionHook).toBe('function');
    expect(typeof index.createSetIntervalHook).toBe('function');
    expect(typeof index.createBase64Hook).toBe('function');
    expect(typeof index.createSplitHook).toBe('function');
    expect(typeof index.createXmlHttpRequestHook).toBe('function');
    expect(typeof index.createBasicXmlHttpRequestHook).toBe('function');
    expect(typeof index.createFetchHook).toBe('function');
    expect(typeof index.createWebSocketHook).toBe('function');
    expect(typeof index.createCookieExampleHook).toBe('function');
    expect(typeof index.createCookieEncapsulatedHook).toBe('function');
    expect(typeof index.createCookieBaseHook).toBe('function');
    expect(typeof index.createCookieBasedHook).toBe('function');
  });
});
