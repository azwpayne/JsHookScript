// Hook Function
(function () {
    var _construtor = constructor;
    Function.prototype.constructor = function (d) {
        if (d === "debugger") {
            console.log("constructor:", d);
            debugger;
            return null;
        }
        return _construtor(d);
    }
}())