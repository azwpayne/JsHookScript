

// perfect
(function () {
    alert('Start Hook');

    // create function cache
    function hook() {
        XMLHttpRequest.prototype.setRequestHeader_cache = XMLHttpRequest.prototype.setRequestHeader;
        XMLHttpRequest.prototype.setRequestHeader = function (val) {
            console.log("Hook val", val);
            debugger;
            return XMLHttpRequest.prototype.setRequestHeader_cache(val);
        }
        //
        XMLHttpRequest.toString = function (){
            return "function XMLHttpRequest() { [native code] }";
        };
        XMLHttpRequest.prototype.setRequestHeader_cache = undefined;
        XMLHttpRequest.length = 1;
    }

    hook()
}());

// Specific
// if want hook setHeader whne name is token
// (function () {
//     alert('Start Hook');
//     // create function cache
//     function hook() {
//         XMLHttpRequest.prototype.setRequestHeader_cache = XMLHttpRequest.prototype.setRequestHeader;
//         XMLHttpRequest.prototype.setRequestHeader = function (val) {
//             if (val.indexOf("Safe") > -1) {
//                 console.log("Hook val", val);
//                 let ret = XMLHttpRequest.prototype.setRequestHeader_cache(val);
//                 debugger;
//                 return ret
//             }
//             return XMLHttpRequest.prototype.setRequestHeader_cache(val);
//         }
//     }
//
//     hook()
// }());

// (function () {
//     console.log('start time:', new Date()['valueOf']())
//     let h = document.createElement('div');
//     let opening = false;
//     let isopen = false;
//     Object.defineProperty(h, 'id', {
//         get: function () {
//             if (!opening) {
//                 console.log('打开控制台了', new Date()['valueOf']());
//                 isopen = true;
//             }
//             isopen = true;
//         }
//     })
// }());