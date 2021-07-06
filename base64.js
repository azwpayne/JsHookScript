// ==UserScript==
// @name             Hook Everthing of btoa
// @namespace    http://tampermonkey.net/
// @version          0.1
// @description   Try to Hook Everthing btoa
// @author          Payne
// @match          *
// @grant        none
// @run-at      document-start
// ==/UserScript==

/* *
* Hook btoa
* btoa: In JavaScript, it is a Base64 Encoding function
* atob: In JavaScript, it is a Base64 Decoding function
* menu:
*   1.The simplest hook
*   2.
*  */

base64Hook_1 = function () {
    'use strict'
    // 0.Injection feedback， when start hook will have a prompt
    alert('Start Hooking ...');
    // 1. rewrite
}


// (function() {
//     'use strict'
//     alert('Start Hooking ...');
//     function hook(obj, attr) {
//         let func = obj[String(attr)];
//         obj[attr] = function() {
//             console.log('hooked', obj, attr, arguments)
//             let ret = func.apply(obj, arguments);
//             console.log('result', ret);
//             debugger;
//             return ret;
//         };
//         // Disguise the prototype
//         attr.toString = function() {
//             return "function btoa() { [native code] }";
//         };
//         attr.length = 1;
//     };
//     hook(window, btoa);
// }());