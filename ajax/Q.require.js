/**
 * 根据依赖加载模块，下载完成以后初始化
 * @param {url} 模块url
 * @param {callback} 模块加载完成以后执行
 */
/**
 * 根据依赖加载模块，下载完成以后初始化
 * @param {url} 模块url
 * @param {callback} 模块加载完成以后执行
 */
Q.require = function(url, callback) {
    var iframe, hash, val;
    hash = Q.hashCode(url);

    function loadContent(url) {
        Q.ajax(url, {
            onSuccess: function(httpRequest) {
                evelScript(httpRequest.responseText);
                window.localStorage[hash] = httpRequest.responseText;
            }
        });
    };

    function evelScript(val) {
        if (window.execScript) {
            window.execScript(val);
        } else {
            window.eval(val);
        }
        callback && callback();
    };

    if (window.localStorage && window.localStorage[hash]) {
        val = window.localStorage[hash];
        evelScript(val);
    } else {
        loadContent(url);
    }
};