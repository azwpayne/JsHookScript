// Special hook
~function () {
    alert("Starting Hook")
    let cookie_cache = document.cookie;
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
}();