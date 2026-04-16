import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create a basic XMLHttpRequest setRequestHeader hook.
 *
 * @param {Function} [logger=()=>{}] - Called whenever setRequestHeader is invoked
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createBasicXmlHttpRequestHook(logger = () => {}) {
  return createMethodHook(XMLHttpRequest.prototype, 'setRequestHeader', (original, name, value) => {
    logger(name, value);
    return original(name, value);
  });
}
