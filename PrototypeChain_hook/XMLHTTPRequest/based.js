// basic
!function hook() {
    alert("start Hook");
    XMLHttpRequest.prototype.setRequestHeader = function () {
    debugger;
}}();
