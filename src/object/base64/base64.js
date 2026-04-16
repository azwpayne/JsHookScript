import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create Base64 hooks for btoa and atob.
 *
 * @param {Object} [callbacks={}] - { onBtoa?, onAtob? }
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createBase64Hook(callbacks = {}) {
  const { onBtoa = () => {}, onAtob = () => {} } = callbacks;

  const btoaHook = createMethodHook(globalThis, 'btoa', (original, ...args) => {
    onBtoa(...args);
    return original(...args);
  });

  const atobHook = createMethodHook(globalThis, 'atob', (original, ...args) => {
    onAtob(...args);
    return original(...args);
  });

  return {
    install() {
      btoaHook.install();
      atobHook.install();
    },
    uninstall() {
      btoaHook.uninstall();
      atobHook.uninstall();
    },
    isInstalled() {
      return btoaHook.isInstalled() || atobHook.isInstalled();
    },
  };
}
