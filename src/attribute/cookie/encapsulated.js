import { createPropertyHook } from '../../lib/hook-utils.js';

/**
 * Create a generic document.cookie getter/setter hook.
 *
 * @param {Object} [callbacks={}] - { onGet?, onSet? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createCookieEncapsulatedHook(callbacks = {}) {
  const { onGet = () => {}, onSet = () => {} } = callbacks;

  return createPropertyHook(document, 'cookie', {
    get(originalValue) {
      onGet(originalValue);
      return originalValue;
    },
    set(val, originalSetter) {
      onSet(val);
      if (originalSetter) {
        originalSetter(val);
      }
    },
  });
}
