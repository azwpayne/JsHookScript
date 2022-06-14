let _setInterval = setInterval;
setInterval = function (a, b) {
    if (a.toString().indexOf("debugger") !== -1) {
        return null;
    }
    _setInterval(a, b);
};