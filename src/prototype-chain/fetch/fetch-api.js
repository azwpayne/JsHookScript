import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create a fetch hook that logs requests and preserves response metadata.
 *
 * @param {Object} [callbacks={}] - { onRequest?, onResponse? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createFetchHook(callbacks = {}) {
  const { onRequest = () => {}, onResponse = () => {} } = callbacks;

  return createMethodHook(globalThis, 'fetch', (original, ...args) => {
    const [resource] = args;
    const url = typeof resource === 'string' ? resource : resource?.url ?? String(resource);
    onRequest(url, ...args);

    return original(...args).then((response) => {
      onResponse(response);
      if (!response.body) {
        return response;
      }
      // Clone response to preserve original metadata while allowing body consumption
      const cloned = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });
      Object.defineProperty(cloned, 'url', { value: response.url });
      return cloned;
    });
  });
}
