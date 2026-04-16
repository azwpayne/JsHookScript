export { createMethodHook, createPropertyHook } from './lib/hook-utils.js';

export { createEvalHook } from './object/eval/eval.js';
export { createJsonInfoHook } from './object/json/json-info.js';
export { createJsonStringifyHook } from './object/json/json-stringify.js';
export { createFunctionHook } from './object/function.js';
export { createSetIntervalHook } from './object/set-interval.js';
export { createBase64Hook } from './object/base64/base64.js';

export { createSplitHook } from './prototype-chain/split/split.js';
export { createXmlHttpRequestHook } from './prototype-chain/xml-http-request/xml-http-request.js';
export { createBasicXmlHttpRequestHook } from './prototype-chain/xml-http-request/based.js';
export { createFetchHook } from './prototype-chain/fetch/fetch-api.js';
export { createWebSocketHook } from './prototype-chain/websocket.js';

export { createCookieExampleHook } from './attribute/cookie/hook-cookie-example.js';
export { createCookieEncapsulatedHook } from './attribute/cookie/encapsulated.js';
export { createCookieBaseHook } from './attribute/cookie/base.js';
export { createCookieBasedHook } from './attribute/cookie/based.js';
