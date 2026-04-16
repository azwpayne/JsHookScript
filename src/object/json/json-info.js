import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create a JSON hook that intercepts JSON.stringify and JSON.parse.
 *
 * @param {Function} [logger=()=>{}] - Called with (operation, value) on each invocation
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createJsonInfoHook(logger = () => {}) {
  const stringifyHook = createMethodHook(JSON, 'stringify', (original, ...args) => {
    logger('json_stringify', args[0]);
    return original(...args);
  });

  const parseHook = createMethodHook(JSON, 'parse', (original, ...args) => {
    logger('json_parse', args[0]);
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
