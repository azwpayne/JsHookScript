import { createPropertyHook } from '../../lib/hook-utils.js';

/**
 * Create a conditional document.cookie hook that triggers only when
 * the cookie value contains a specific substring.
 *
 * @param {Object} [options={}] - { trigger, onTrigger? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createCookieBasedHook(options = {}) {
  const { trigger = '', onTrigger = () => {} } = options;

  return createPropertyHook(document, 'cookie', {
    get(originalValue) {
      return originalValue;
    },
    set(val, originalSetter) {
      if (trigger && val.includes(trigger)) {
        onTrigger(val);
      }
      if (originalSetter) {
        originalSetter(val);
      }
    },
  });
}
