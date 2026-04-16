import { createPropertyHook } from '../../lib/hook-utils.js';

/**
 * Parse a simple cookie string into a Map.
 * Only handles the first key=value pair; ignores attributes (path, expires, etc.).
 *
 * @param {string} cookieStr
 * @returns {Map<string, string>}
 */
function parseCookies(cookieStr) {
  const map = new Map();
  if (!cookieStr) return map;
  const pairs = cookieStr.split(';').map((s) => s.trim()).filter(Boolean);
  for (const pair of pairs) {
    const [key, ...rest] = pair.split('=');
    map.set(key.trim(), rest.join('=').trim());
  }
  return map;
}

/**
 * Serialize a Map of cookies back to a semicolon-delimited string.
 *
 * @param {Map<string, string>} map
 * @returns {string}
 */
function serializeCookies(map) {
  const entries = [];
  for (const [key, value] of map) {
    entries.push(`${key}=${value}`);
  }
  return entries.join('; ');
}

/**
 * Create a full-featured document.cookie hook with parsing and merging logic.
 *
 * @param {Object} [callbacks={}] - { onGet?, onSet? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createCookieExampleHook(callbacks = {}) {
  const { onGet = () => {}, onSet = () => {} } = callbacks;
  const cookieMap = new Map();

  return createPropertyHook(document, 'cookie', {
    get(originalValue) {
      onGet(originalValue);
      const merged = parseCookies(originalValue);
      for (const [key, value] of cookieMap) {
        merged.set(key, value);
      }
      return serializeCookies(merged);
    },
    set(val, originalSetter) {
      onSet(val);
      const firstPair = val.split(';')[0].trim();
      const [key, ...rest] = firstPair.split('=');
      if (key) {
        cookieMap.set(key.trim(), rest.join('=').trim());
      }
      if (originalSetter) {
        originalSetter(val);
      }
    },
  });
}
