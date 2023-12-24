// Special hook
~function () {
    alert("Starting Hook");
    let cookie_cache = document.cookie;
    Object.defineProperty(document, 'cookie', {
        get() {
            return cookie_cache;
        },
        set(val) {
            if (val.indexOf('GW1gelwM5YZuT') > -1) {
                debugger;
            }
            return cookie_cache;
        }
    })
}();