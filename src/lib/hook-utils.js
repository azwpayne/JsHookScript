/**
 * @typedef {Object} HookResult
 * @property {() => void} install
 * @property {() => void} uninstall
 * @property {() => boolean} isInstalled
 */

/**
 * Create a method hook with install/uninstall semantics.
 * Caches the original method in a closure, avoiding prototype pollution.
 *
 * @param {Object} target - Object owning the method (e.g., String.prototype)
 * @param {string} method - Name of the method to hook
 * @param {Function} wrapper - (originalFn, ...args) => any
 * @returns {HookResult}
 */
export function createMethodHook(target, method, wrapper) {
  const original = target[method];
  let installed = false;

  const install = () => {
    if (installed) return;
    target[method] = function (...args) {
      return wrapper(original.bind(this), ...args);
    };
    installed = true;
  };

  const uninstall = () => {
    if (!installed) return;
    target[method] = original;
    installed = false;
  };

  const isInstalled = () => installed;

  return { install, uninstall, isInstalled };
}

/**
 * Create an attribute hook via Object.defineProperty with install/uninstall.
 *
 * @param {Object} target - Object to define property on (e.g., document)
 * @param {string} attr - Attribute name
 * @param {Object} handlers - { get?: (originalValue) => any, set?: (val, originalSetter?) => any }
 * @returns {HookResult}
 */
export function createPropertyHook(target, attr, handlers) {
  const originalDescriptor = Object.getOwnPropertyDescriptor(target, attr);
  let installed = false;

  const install = () => {
    if (installed) return;

    const descriptor = {};

    if (handlers.get) {
      descriptor.get = function () {
        const originalValue = originalDescriptor?.get
          ? originalDescriptor.get.call(this)
          : this[attr];
        return handlers.get(originalValue);
      };
    } else if (originalDescriptor?.get) {
      descriptor.get = originalDescriptor.get;
    }

    if (handlers.set) {
      descriptor.set = function (val) {
        if (originalDescriptor?.set) {
          return handlers.set(val, originalDescriptor.set.bind(this));
        }
        return handlers.set(val);
      };
    } else if (originalDescriptor?.set) {
      descriptor.set = originalDescriptor.set;
    }

    descriptor.configurable = true;
    descriptor.enumerable = originalDescriptor?.enumerable ?? true;

    Object.defineProperty(target, attr, descriptor);
    installed = true;
  };

  const uninstall = () => {
    if (!installed) return;
    if (originalDescriptor) {
      Object.defineProperty(target, attr, originalDescriptor);
    } else {
      delete target[attr];
    }
    installed = false;
  };

  const isInstalled = () => installed;

  return { install, uninstall, isInstalled };
}
