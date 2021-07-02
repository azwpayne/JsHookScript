// create split cache from proto
String.prototype.split_cache = String.prototype.split
String.prototype.split = function(val) {
    // Gets the variable of the current scope
    str = this.String();
    console.log('Arguments:', val)
    debugger;
    return str.split_cache(val);
}