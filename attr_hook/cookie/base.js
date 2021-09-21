~function () {
    alert("Starting Hook")
    Object.defineProperty(document, 'cookie', {
        get: function () {
            debugger;
        },
        set: function () {
            debugger;
        }
    })
}();