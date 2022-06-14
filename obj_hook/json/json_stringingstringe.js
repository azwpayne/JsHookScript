/*
* Hook Json Parsing and stringification
* */

function HookJsonParsing() {
    alert("start Hook Json Parsing...")
    let func = JSON.stringify;
    JSON.stringify = function () {
        console.log('Detect arguments', arguments);
        debugger;
        let result = func.apply(func, arguments);
        console.log("Result:", result);
        return result;
    }
}

function HookJsonStringification() {
    alert("start Hook Json Parsing...")
    let func = JSON.parse;
    JSON.parse = function () {
        console.log('Detect arguments', arguments);
        debugger;
        let result = func.apply(func, arguments);
        console.log("Result:", result);
        return result;
    }
}



