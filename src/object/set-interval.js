import { createMethodHook } from '../lib/hook-utils.js';

/**
 * Create a setInterval hook that neutralizes common anti-debug timers.
 *
 * @param {Object} [options={}] - { onBlock? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createSetIntervalHook(options = {}) {
  const { onBlock = () => {} } = options;

  return createMethodHook(globalThis, 'setInterval', (original, callback, delay, ...args) => {
    const cbString = typeof callback === 'function' ? callback.toString() : String(callback);
    if (cbString.includes('debugger')) {
      onBlock(callback);
      return null;
    }
    return original(callback, delay, ...args);
  });
}
