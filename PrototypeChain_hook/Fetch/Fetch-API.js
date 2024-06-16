
'use strict';
(function () {
    window.au_fetch = window.fetch;
    window.fetch = function (url) {
        console.log(url);
        return window.au_fetch.apply(window, arguments).then((response) => {
            const reader = response.body.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    function push() {
                        // "done"是一个布尔型，"value"是一个Unit8Array
                        reader.read().then((e) => {
                            let { done, value } = e;
                            // 判断是否还有可读的数据？
                            console.log(done, new TextDecoder("utf-8").decode(value));
                            if (done) {
                                // 告诉浏览器已经结束数据发送
                                controller.close();
                                return;
                            }
                            // 取得数据并将它通过controller发送给浏览器
                            controller.enqueue(value);
                            push();
                        });
                    }
                    push();
                }
            });
            let ret = new Response(stream, { headers: { "Content-Type": "text/html" } })
            console.log(stream, ret);
            return ret;
        });
    };
})