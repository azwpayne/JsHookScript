!function () {
    alert('Start Hook');
    // create function cache
    function hook() {
        String.prototype.split_cache = String.prototype.split
        String.prototype.split = function (val) {
            // Gets the variable of the current scope
            let str = this.String();
            console.log('Arguments:', val)
            debugger;
            return str.split_cache(val);
        }

    }
    hook()
}();