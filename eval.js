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
        debugger;
        console.log('val :', val);
        return eval_new(val)
    };
    // Disguise the prototype
    eval.toString = function () {
        return "function eval() { [native code] }"
    };
    eval.length = 1;
})();
