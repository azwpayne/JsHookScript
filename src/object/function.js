import { createMethodHook } from '../lib/hook-utils.js';

/**
 * Create a Function constructor hook.
 * Blocks creation of functions whose body string is exactly "debugger".
 *
 * @param {Object} [options={}] - { onBlock? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createFunctionHook(options = {}) {
  const { onBlock = () => {} } = options;

  return createMethodHook(Function.prototype, 'constructor', (original, ...args) => {
    const body = args[args.length - 1];
    if (typeof body === 'string' && body.trim() === 'debugger') {
      onBlock(body);
      return null;
    }
    return original(...args);
  });
}
