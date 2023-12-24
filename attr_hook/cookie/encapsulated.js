!function () {
    alert("Starting Hook")

    function hook(obj, attr) {
        let attr_cache = obj[attr];
        Object.defineProperty(obj, attr, {
            get() {
                debugger;
                return attr_cache;
            },
            set() {
                console.log('Hooked', arguments)
                debugger;
                return attr_cache;
            }
        })
    }

    hook(document, 'cookie')
}();