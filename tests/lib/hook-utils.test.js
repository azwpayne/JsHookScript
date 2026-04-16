import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createMethodHook, createPropertyHook } from '../../src/lib/hook-utils.js';

describe('createMethodHook', () => {
  beforeEach(() => {
    // Ensure clean state on a test object
    globalThis.testObj = {
      value: 42,
      greet(name) {
        return `hello ${name}`;
      },
    };
  });

  afterEach(() => {
    delete globalThis.testObj;
  });

  it('should install and uninstall a method hook', () => {
    const hook = createMethodHook(globalThis.testObj, 'greet', (original, name) => {
      return `[HOOKED] ${original(name)}`;
    });

    expect(hook.isInstalled()).toBe(false);
    hook.install();
    expect(hook.isInstalled()).toBe(true);
    expect(globalThis.testObj.greet('world')).toBe('[HOOKED] hello world');

    hook.uninstall();
    expect(hook.isInstalled()).toBe(false);
    expect(globalThis.testObj.greet('world')).toBe('hello world');
  });

  it('should not leave cache properties on the prototype', () => {
    const originalKeys = Object.getOwnPropertyNames(String.prototype);
    const hook = createMethodHook(String.prototype, 'split', (original, separator) => {
      return original(separator);
    });

    hook.install();
    const installedKeys = Object.getOwnPropertyNames(String.prototype);
    expect(installedKeys).toEqual(originalKeys);

    hook.uninstall();
    const uninstalledKeys = Object.getOwnPropertyNames(String.prototype);
    expect(uninstalledKeys).toEqual(originalKeys);
  });

  it('should preserve this binding', () => {
    const hook = createMethodHook(globalThis.testObj, 'greet', (original, name) => {
      return `${original(name)} - ${this?.value ?? 'no-this'}`;
    });
    hook.install();
    expect(globalThis.testObj.greet('world')).toBe('hello world - no-this');
    hook.uninstall();
  });

  it('should be idempotent on repeated install/uninstall', () => {
    const hook = createMethodHook(globalThis.testObj, 'greet', (original, name) => {
      return `[HOOKED] ${original(name)}`;
    });

    hook.install();
    hook.install();
    expect(globalThis.testObj.greet('world')).toBe('[HOOKED] hello world');

    hook.uninstall();
    hook.uninstall();
    expect(globalThis.testObj.greet('world')).toBe('hello world');
  });
});

describe('createPropertyHook', () => {
  beforeEach(() => {
    globalThis.testDoc = {
      _cookie: 'a=1',
    };
    Object.defineProperty(globalThis.testDoc, 'cookie', {
      get() {
        return this._cookie;
      },
      set(val) {
        this._cookie = val;
      },
      configurable: true,
      enumerable: true,
    });
  });

  afterEach(() => {
    delete globalThis.testDoc;
  });

  it('should install and uninstall a property hook', () => {
    const hook = createPropertyHook(globalThis.testDoc, 'cookie', {
      get(originalValue) {
        return `[GET] ${originalValue}`;
      },
      set(val, originalSetter) {
        originalSetter(`[SET] ${val}`);
      },
    });

    expect(hook.isInstalled()).toBe(false);
    hook.install();
    expect(hook.isInstalled()).toBe(true);
    expect(globalThis.testDoc.cookie).toBe('[GET] a=1');

    globalThis.testDoc.cookie = 'b=2';
    expect(globalThis.testDoc.cookie).toBe('[GET] [SET] b=2');

    hook.uninstall();
    expect(hook.isInstalled()).toBe(false);
    expect(globalThis.testDoc.cookie).toBe('[SET] b=2');
  });

  it('should restore original descriptor on uninstall', () => {
    const originalDescriptor = Object.getOwnPropertyDescriptor(globalThis.testDoc, 'cookie');
    const hook = createPropertyHook(globalThis.testDoc, 'cookie', {
      get(originalValue) {
        return `hooked:${originalValue}`;
      },
    });

    hook.install();
    hook.uninstall();

    const restoredDescriptor = Object.getOwnPropertyDescriptor(globalThis.testDoc, 'cookie');
    expect(restoredDescriptor.get).toBe(originalDescriptor.get);
    expect(restoredDescriptor.set).toBe(originalDescriptor.set);
    expect(restoredDescriptor.configurable).toBe(originalDescriptor.configurable);
    expect(restoredDescriptor.enumerable).toBe(originalDescriptor.enumerable);
  });

  it('should be idempotent on repeated install/uninstall', () => {
    const hook = createPropertyHook(globalThis.testDoc, 'cookie', {
      get(originalValue) {
        return `hooked:${originalValue}`;
      },
    });

    hook.install();
    hook.install();
    expect(globalThis.testDoc.cookie).toBe('hooked:a=1');

    hook.uninstall();
    hook.uninstall();
    expect(globalThis.testDoc.cookie).toBe('a=1');
  });
});
