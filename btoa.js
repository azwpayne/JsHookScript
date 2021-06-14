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
(function() {
    'use strict'
    alert('Start Hooking ...');

    function hook(obj, attr) {
        var func = obj[attr]
        obj[attr] = function() {
                console.log('hooked', obj, attr, arguments)
                var ret = func.apply(obj, arguments)
                debugger
                console.log('result', ret)
                return ret
            }
            // Disguise the prototype
        attr.toString = function() {
            return "function btoa() { [native code] }";
        };
        attr.length = 1;
    }
    hook(window, 'btoa')
})()