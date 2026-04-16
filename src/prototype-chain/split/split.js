import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create a String.prototype.split hook.
 *
 * @param {Function} [logger=()=>{}] - Called with (separator, limit) on each invocation
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createSplitHook(logger = () => {}) {
  return createMethodHook(String.prototype, 'split', (original, separator, limit) => {
    logger(separator, limit);
    return original(separator, limit);
  });
}
