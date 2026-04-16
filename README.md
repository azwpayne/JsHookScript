# JsHookScript

A curated collection of browser-side JavaScript hooking utilities for reverse engineering, security research, and dynamic analysis.

> **Note:** This project is intended for educational and authorized security research purposes only.

---

## Table of Contents

- [What is JsHookScript?](#what-is-jshookscript)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Hook Catalog](#hook-catalog)
- [API Usage](#api-usage)
- [Hooking Methodology](#hooking-methodology)
- [Running Tests](#running-tests)
- [Important Notes](#important-notes)
- [References](#references)

---

## What is JsHookScript?

JavaScript reverse engineering is often slow and tedious because code is minified, obfuscated, or buried deep in frameworks. **Hooking** simplifies this process by intercepting native APIs and application entry points at runtime, allowing you to:

- Inspect arguments and return values
- Place breakpoints (`debugger`) dynamically
- Modify behavior on the fly
- Trace data flow through suspicious functions

JsHookScript provides reusable, testable hook utilities with `install()` / `uninstall()` semantics.

---

## Quick Start

For one-off console usage, copy a snippet from `src/` and run it in the browser DevTools. For repeatable analysis, import the hook factory and manage its lifecycle:

```javascript
import { createFetchHook } from './src/index.js';

const hook = createFetchHook({
  onRequest: (url) => console.log('[Fetch]', url),
});

hook.install();
// ... do your analysis ...
hook.uninstall();
```

---

## Installation

```bash
npm install
```

---

## Project Structure

```
src/
├── lib/
│   └── hook-utils.js       # Reusable install/uninstall primitives
├── attribute/
│   └── cookie/             # document.cookie hooks via Object.defineProperty
├── object/
│   ├── base64/             # btoa / atob hooks
│   ├── eval/               # eval hooks
│   ├── json/               # JSON.parse / JSON.stringify hooks
│   ├── function.js         # Function constructor hooks
│   └── set-interval.js     # setInterval anti-debug bypass
└── prototype-chain/
    ├── split/              # String.prototype.split hook
    ├── xml-http-request/   # XMLHttpRequest hooks
    ├── fetch/              # fetch API hook
    └── websocket.js        # WebSocket.send hook
```

---

## Hook Catalog

### 1. Function Hooks (`src/object/`)

| File                     | Target                           | Description                              |
| ------------------------ | -------------------------------- | ---------------------------------------- |
| `eval/eval.js`           | `eval`                           | Intercepts dynamic code execution        |
| `json/json-info.js`      | `JSON.parse` / `JSON.stringify`  | Logs serialization / deserialization     |
| `json/json-stringify.js` | `JSON.parse` / `JSON.stringify`  | Separate-callback variant                |
| `base64/base64.js`       | `btoa` / `atob`                  | Intercepts Base64 encoding / decoding    |
| `function.js`            | `Function.prototype.constructor` | Blocks or logs dynamic function creation |
| `set-interval.js`        | `setInterval`                    | Neutralizes common anti-debug timers     |

### 2. Attribute Hooks (`src/attribute/`)

| File                           | Target            | Description                                      |
| ------------------------------ | ----------------- | ------------------------------------------------ |
| `cookie/hook-cookie-example.js`| `document.cookie` | Full read/write interception with cookie parsing |
| `cookie/encapsulated.js`       | `document.cookie` | Minimal generic getter/setter hook               |
| `cookie/base.js`               | `document.cookie` | Bare-bones access observer                       |
| `cookie/based.js`              | `document.cookie` | Conditional trigger on specific cookie value     |

### 3. Prototype Chain Hooks (`src/prototype-chain/`)

| File                               | Target                            | Description                                    |
| ---------------------------------- | --------------------------------- | ---------------------------------------------- |
| `split/split.js`                   | `String.prototype.split`          | Intercepts string splitting                    |
| `xml-http-request/xml-http-request.js` | `XMLHttpRequest.setRequestHeader` | Logs outgoing request headers              |
| `fetch/fetch-api.js`               | `window.fetch`                    | Intercepts and logs network requests/responses |
| `websocket.js`                     | `WebSocket.prototype.send`        | Logs WebSocket messages                        |

---

## API Usage

Every hook factory returns an object with three methods:

- `install()` — activate the hook
- `uninstall()` — restore the original function or property descriptor
- `isInstalled()` — boolean state check

### Example — Hook `eval`

```javascript
import { createEvalHook } from 'jshookscript';

const hook = createEvalHook((source) => {
  console.log('[Hook] eval called with:', source);
});

hook.install();
eval('1 + 1');        // logs the source
hook.uninstall();
```

### Example — Hook `document.cookie`

```javascript
import { createCookieExampleHook } from 'jshookscript';

const hook = createCookieExampleHook({
  onGet: (value) => console.log('[Cookie] get:', value),
  onSet: (value) => console.log('[Cookie] set:', value),
});

hook.install();
```

### Example — Hook `fetch`

```javascript
import { createFetchHook } from 'jshookscript';

const hook = createFetchHook({
  onRequest: (url) => console.log('[Fetch] request:', url),
  onResponse: (res) => console.log('[Fetch] response status:', res.status),
});

hook.install();
```

---

## Hooking Methodology

Most hooks in this repo follow a simple 3-step pattern:

### Step 1 — Cache the Original

```javascript
const original = targetFunction;
```

### Step 2 — Replace with Wrapper

```javascript
targetFunction = function (...args) {
    // Your inspection / logging / modification logic
    return original.apply(this, args);
};
```

### Step 3 — Disguise the Hook (optional)

```javascript
targetFunction.toString = function () {
    return 'function targetFunction() { [native code] }';
};
```

> For attribute hooks, use `Object.defineProperty(obj, 'attr', { get() {...}, set(v) {...} })` instead.

Under the hood, `createMethodHook` and `createPropertyHook` handle these steps for you, store originals in closures (never on prototypes), and provide clean uninstall semantics.

---

## Running Tests

This project uses **Vitest** with **jsdom**:

```bash
npm test              # run all tests
npm run test:coverage # run tests with coverage report
npm run lint          # run ESLint
```

Minimum coverage threshold: **80%**.

---

## Important Notes

- **Order matters:** Hooks must be installed **before** the target code runs. Run them at `document-start` (e.g., via Tampermonkey) or immediately in the console.
- **Stealth:** `alert()` calls and `debugger` statements in educational snippets should be removed for stealthy analysis.
- **Detection:** Advanced anti-debugging scripts can detect hooked functions by checking `toString`, prototype properties, or timing. Consider using a proxy or native-code binding for hardened targets.
- **Side effects:** Hooking global APIs can break site functionality. Use a dedicated browser profile or VM for untrusted targets.

---

## References

- [ast-hook-for-js-RE](https://github.com/JSREI/ast-hook-for-js-RE) — AST-level hooking toolkit for JavaScript reverse engineering.
