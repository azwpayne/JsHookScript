// ==UserScript==
// @name             Hook Everthing of eval
// @namespace    http://tampermonkey.net/
// @version          0.1
// @description   Try to Hook Everthing eval
// @author          Payne
// @match          *
// @grant        none
// @run-at      document-start
// ==/UserScript==


// 最简单的cookie hook
(function () {
    alert("Starting Hook")
    Object.defineProperty(document, 'cookie', {
        get: function () {
            debugger;
            return;
        },
        set: function () {
            debugger;
            return;
        }
    })
}())


// 特殊hook
(function () {
    alert("Starting Hook")
    var cookie_cache = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get: function () {
            return cookie_cache;
        },
        set: function (val) {
            if (val.indexOf('GW1gelwM5YZuT') > -1) {
                debugger;
            }
            return cookie_cache;
        }
    })
}())

(function(){
    alert("Starting Hook")
    cookie_cache = document.cookie
    Object.defineProperty(document, 'cookie', {
        get: function() {
            debugger;
            return cookie_cache;
        },
        set: function() {
            debugger;
            return cookie_cache;
        }
    })
}())


