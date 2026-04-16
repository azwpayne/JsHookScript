import { createMethodHook } from '../lib/hook-utils.js';

/**
 * Create a WebSocket hook that intercepts send.
 *
 * @param {Function} [logger=()=>{}] - Called with (data) on each invocation
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createWebSocketHook(logger = () => {}) {
  return createMethodHook(WebSocket.prototype, 'send', (original, data) => {
    logger(data);
    return original(data);
  });
}
