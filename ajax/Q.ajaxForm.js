/**
 * 将一个表单用ajax方式提交
 * @name Q.ajaxForm
 * @example
   Q.ajaxForm(form[, options])
 * @param {HTMLFormElement} form  需要提交的表单元素
 * @param {Function} [option.encoder] 对表单的值进行转义或过滤。如：对字符串进行%#&+=以及和\s匹配的所有字符进行url转义
 * @param {String} [option.data] 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param {String | Object} [option.arguments] 请求响应后回调函数需要传递的参数
 * @param {Boolean} [option.async] 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 * @param {Boolean} [option.cache] 默认值: false, 设置为 false 将不缓存此页面。
 * @param {Function} [option.onSuccess] 请求成功后的回调函数。
 * @param {Function} [option.onError] 请求失败时调用此函数。如果发生了错误，错误信息（第二个参数）除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
 * @param {Function} [option.onComplete] 当请求完成之后调用这个函数，无论成功或失败。传入 XMLHttpRequest 对象，以及一个包含成功或错误代码的字符串。
 * @param {Function} [option.onTimeout] 请求超时后回调函数, 超时不会中断请求，根据返回的Ajax自行中断。
 * @param {Function} [option.on{status_number}] 当请求为相应状态码时触发的事件，如on302、on404、on500
 * @param {Function} [option.onBeforeSend] 发送请求之前触发。
 * @param {Number} [option.timeout] 超时时间，单位ms, 默认值：30000
 * @param {Object}  [option.headers]            要设置的请求 header
 * @param {String} [option.contentType] 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
 * @param {String} [option.type] 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
 * @param {String} [option.dataType] 预期服务器返回的数据类型，默认是Json。
 * @remark
   具体参数查看Q.ajax。          
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
Q.ajaxForm = function(form, options) {
    form = Q(form);
    var attr = Q.attr, 
        encoder = function(v) {
            return v;
        },
        tmpstr,
        method = attr(form, 'method'),
        url = attr(form, 'action'),
        params = {};

    options = options || {};
    encoder = options.encoder || encoder;

    // 复制发送参数选项对象
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            params[i] = options[i];
        }
    }

    // 完善发送请求的参数选项
    tmpstr        = (options.data ? "&" + options.data : "");
    params.data   = Q.serializeForm(form, encoder) + tmpstr;
    params.method = method;

    // 发送请求
    return Q.ajax(url, params);
};