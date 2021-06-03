// ==UserScript==
// @name             Hook Everthing of btoa
// @namespace    http://tampermonkey.net/
// @version          0.1
// @description   Try to Hook Everthing btoa
// @author          Payne
// @match          *
// @icon             https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @run-at      document-start
// ==/UserScript==
(function () {
    'use strict'
    alert('Start Hooking ...');
    function hook(object, attr) {
        var func = object[attr]
        object[attr] = function () {
            console.log('hooked', object, attr, arguments)
            var ret = func.apply(object, arguments)
            debugger
            console.log('result', ret)
            return ret
        }
    }
    hook(window, 'btoa')
})()
