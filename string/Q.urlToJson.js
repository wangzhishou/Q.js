/**
 * 解析字url符串成json对象
 * @name Q.urlToJson
 * @example Q.urlToJson(url)
 * @param {string} url 目标字符串
 *
 * @return {Object} - 解析为结果对象，相同字符串被解析成数组。
 */
Q.urlToJson = function(url) {
    var query = url.substr(url.lastIndexOf('?') + 1),
        params = query.split('&'),
        len = params.length,
        result = {},
        i = 0,
        key, value, item, param;

    for (; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        param = params[i].split('=');
        key = param[0];
        value = param[1];

        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (Q.isArray(item)) {
            item.push(value);
        } else {
            result[key] = [item, value];
        }
    }
    return result;
};