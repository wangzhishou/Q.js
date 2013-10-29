/**
 * 创建ajax请求，包含常用功能
 * @name Q.ajax
 * @param {String} url 要加载的数据的url
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
 * @param {Object} 	[option.headers] 			要设置的请求 header
 * @param {String} [option.contentType] 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
 * @param {String} [option.method] 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
 * @param {String} [option.dataType] 预期服务器返回的数据类型，默认是Json。
 * @remark 
   由于不常用，去掉了用户名和密码验证功能。
 * @return {Object} ajax 返回一个ajax对象，可以abort掉
 */
Q.ajax = function(url, options) {
	var httpRequest, timeout, timer, key, eventHandlers = {},
		method = options.method || "GET",
		data = options.data || null,
		arguments = options.arguments || null,
		//async = options.async || true,
		async = ("async" in options)?options.async:true,
		timeout = options.timeout ? options.timeout : 30000,
		dataType = options.dataType || "json",
		cache = options.cache || false;

	var defaultHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		'X-Requested-With': 'XMLHttpRequest'
	};

	var headers = options.headers || {};
	for (key in headers) {
		if (headers.hasOwnProperty(key)) {
			defaultHeaders[key] = headers[key];
		}
	}

	url = url || "";
	method = method.toUpperCase();

	/**
	 * 获取XMLHttpRequest对象
	 *
	 * @return {XMLHttpRequest} XMLHttpRequest对象
	 */

	function getXMLHttpRequest() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
	}

	/**
	 * 触发事件
	 *
	 * @param {String} type 事件类型
	 */

	function callHandler(type) {
		var handler = eventHandlers[type];
		if (handler) {
			if (timer) {
				clearTimeout(timer);
			}

			if (type != 'onSuccess') {
				handler(httpRequest, arguments);
			} else {
				try {
					httpRequest.responseText;
				} catch (error) {
					return handler(httpRequest, arguments);
				}
				if (dataType.toLowerCase() === "script") {
					eval.call(window, httpRequest.responseText);
				}
				handler(httpRequest, arguments);
			}
		}
	}

	/**
	 * readyState发生变更时调用
	 */

	function stateChangeHandler() {
		if (httpRequest.readyState == 4) {
			try {
				var stat = httpRequest.status;
			} catch (ex) {
				callHandler('onError');
				return;
			}
			callHandler("on" + stat);
			if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
				callHandler('onSuccess');
			} else {
				callHandler('onError');
			}
			callHandler('onComplete');
			window.setTimeout(function() {
				httpRequest.onreadystatechange = function() {};
				if (async) {
					httpRequest = null;
				}
			}, 0);
		}
	}

	for (key in options) {
        eventHandlers[key] = options[key];
    }
	try {
		httpRequest = getXMLHttpRequest();
		if (data) {
			url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
			data = null;
		}
		if (!cache) {
			url += (url.indexOf('?') >= 0 ? '&' : '?') + 'q' + (+new Date) + '=Q';
		}
		httpRequest.open(method, url, async);
		if (async) {
			httpRequest.onreadystatechange = stateChangeHandler;
		}
		for (key in defaultHeaders) {
			if (defaultHeaders.hasOwnProperty(key)) {
				httpRequest.setRequestHeader(key, defaultHeaders[key]);
			}
		}
		callHandler('onBeforeSend');
		httpRequest.send(options.data);
		if (timeout) {
			timer = window.setTimeout(function() {
				callHandler("onTimeout");
			}, timeout);
		}
	} catch (ex) {
		callHandler('onError');
	}
	//返回一个ajax对象，可以abort掉
	return httpRequest;
};