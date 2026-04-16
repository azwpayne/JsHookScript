import { createMethodHook } from '../../lib/hook-utils.js';

/**
 * Create an eval hook that intercepts both global eval and window.eval.
 *
 * @param {Function} [logger=()=>{}] - Called with (source) whenever eval is invoked
 * @returns {Object} { install, uninstall, isInstalled }
 */
export function createEvalHook(logger = () => {}) {
  const hooks = [];

  const globalHook = createMethodHook(globalThis, 'eval', (original, source) => {
    logger(source);
    return original(source);
  });
  hooks.push(globalHook);

  if (globalThis.window && globalThis.window.eval !== globalThis.eval) {
    const windowHook = createMethodHook(globalThis.window, 'eval', (original, source) => {
      logger(source);
      return original(source);
    });
    hooks.push(windowHook);
  }

  return {
    install() {
      hooks.forEach((h) => h.install());
    },
    uninstall() {
      hooks.forEach((h) => h.uninstall());
    },
    isInstalled() {
      return hooks.some((h) => h.isInstalled());
    },
  };
}
