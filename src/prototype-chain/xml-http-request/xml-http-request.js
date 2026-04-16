import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create an XMLHttpRequest hook that intercepts setRequestHeader.
 *
 * @param {Function} [logger=()=>{}] - Called with (name, value) on each invocation
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createXmlHttpRequestHook(logger = () => {}) {
  return createMethodHook(XMLHttpRequest.prototype, 'setRequestHeader', (original, name, value) => {
    logger(name, value);
    return original(name, value);
  });
}
