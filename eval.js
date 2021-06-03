// ==UserScript==
// @name             Hook Everthing of eval
// @namespace    http://tampermonkey.net/
// @version          0.1
// @description   Try to Hook Everthing eval
// @author          Payne
// @match          *
// @icon             https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @run-at      document-start
// ==/UserScript==

(function () {
    // 0.Tips
    alert('Start Hooking ...');
    // Building replica function objects,  Prepare the hook
    var eval_new = eval;
    //rewrite function to hook;
    eval = function (val) {
        console.log('Hooked :', val);
        debugger;
        return eval_new(val)
    };
    // Disguise the prototype
    eval.toString = function () {
        return "function eval() { [native code] }"
    };
    eval.length = 1;
})();
// ===================================2===================================


(function () {
    // 0.Tips
    alert('Start Hooking ...');
    // Building replica function objects,  Prepare the hook
    var eval_new = window.eval;
    //rewrite function to hook;
    window.eval = function (val) {
        console.log('Hooked :', val, window, eval, arguments);
        debugger;
        return eval_new(val)
    };
    // Disguise the prototype
    window.eval.toString = function () {
        return "function eval() { [native code] }"
    };
    window.eval.length = 1;
})();

// ====================================3===================================

(function () {
    // 0.Tips
    alert('Start Hooking ...');
    // Building replica function objects,  Prepare the hook
    var eval_new = window.eval;
    //rewrite function to hook;
    window.eval = function (val) {
        console.log('Hooked :', val, window, eval, arguments);
        var result = eval_new.apply(window.eval, arguments)
        debugger;
        console.log('result', result)
        return result
    };
    // Disguise the prototype
    window.eval.toString = function () {
        return "function eval() { [native code] }"
    };
    window.eval.length = 1;
})();

// ====================================4===================================

(function () {
    alert('Start Hooking ...');
    function Hooker(object, attr) {
        var func = object[attr]
        object[attr] = function () {
            console.log('hooked', object, attr, arguments)
            var result = func.apply(object, arguments)
            debugger
            console.log('result', result)
            return result
        }
        //     // Disguise the prototype
        eval.toString = function () {
            return "function eval() { [native code] }"
        };
        eval.length = 1;
    }
    Hooker(window, 'eval')
})()