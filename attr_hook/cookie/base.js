~function () {
    alert("Starting Hook")
    Object.defineProperty(document, 'cookie', {
        get() {
            debugger;
        },
        set() {
            debugger;
        }
    })
}();