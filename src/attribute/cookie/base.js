import { createPropertyHook } from '../../lib/hook-utils.js';

/**
 * Create a bare-bones document.cookie hook that simply observes access.
 *
 * @param {Object} [callbacks={}] - { onGet?, onSet? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createCookieBaseHook(callbacks = {}) {
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
