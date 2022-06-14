var my_stringify = JSON.stringify;
JSON.stringify = function (params) {
    console.log("json_stringify:", params);
    return json_stringify(params);
};

var my_parse = JSON.parse;
JSON.parse = function (params) {
    console.log("json_parse:", params);
    return json_parse(params);
};
        