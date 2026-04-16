import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create a JSON hook that intercepts JSON.stringify and JSON.parse with separate callbacks.
 *
 * @param {Object} callbacks - { onStringify?, onParse? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createJsonStringifyHook(callbacks = {}) {
  const { onStringify = () => {}, onParse = () => {} } = callbacks;

  const stringifyHook = createMethodHook(JSON, 'stringify', (original, ...args) => {
    onStringify(...args);
    return original(...args);
  });

  const parseHook = createMethodHook(JSON, 'parse', (original, ...args) => {
    onParse(...args);
    return original(...args);
  });

  return {
    install() {
      stringifyHook.install();
      parseHook.install();
    },
    uninstall() {
      stringifyHook.uninstall();
      parseHook.uninstall();
    },
    isInstalled() {
      return stringifyHook.isInstalled() || parseHook.isInstalled();
    },
  };
}
