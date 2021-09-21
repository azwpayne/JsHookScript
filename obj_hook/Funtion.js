// Hook Function
(function() {
    alert(1);
    let  construtor_cache = window.constructor;
    Function.prototype.constructor = function(d) {
        if (d === "debugger") {
            console.log("constructor:", d);
            debugger;
            return null;
        }
        return construtor_cache(d);
    }
}())