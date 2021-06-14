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


// The simplest cookie hook
(function() {
    alert("Starting Hook")
    Object.defineProperty(document, 'cookie', {
        get: function() {
            debugger;
            return;
        },
        set: function() {
            debugger;
            return;
        }
    })
}())


// Special hook
(function() {
    alert("Starting Hook")
    var cookie_cache = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get: function() {
            return cookie_cache;
        },
        set: function(val) {
            if (val.indexOf('GW1gelwM5YZuT') > -1) {
                debugger;
            }
            return cookie_cache;
        }
    })
}())

// Another special hook
(function() {
    alert("Starting Hook");

    function hook(obj, attr) {
        var cookie_cache = obj[attr];
        Object.defineProperty(obj, attr, {
            get: function() {
                return cookie_cache;
            },
            set: function(val) {
                if (val.indexOf('GW1gelwM5YZuT') > -1) {
                    console.log('cookie: ', val)
                    debugger;
                }
                console.log('cookie: ', val)
                return cookie_cache;
            }
        })
    }
    hook(document, 'cookie')
}())

// 升级版
(function() {
    alert("Starting Hook")
    var cookie_cache = document.cookie;
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

//封装