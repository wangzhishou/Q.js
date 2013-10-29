/**
 * 设置cookie
 * @name Q.setCookie
 * @example 
   Q.setCookie(name, value[, options])
 * @params {string} name 需要设置Cookie的键名
 * @params {string} value 需要设置Cookie的值
 * @params {string} [path] cookie路径
 * @params {Date} [expires] cookie过期时间
 * @params {string} [domain] cookie域名
 * @params {string} [secure] cookie是否安全传输
 * @remark
 * 清除cookie，设置expires= new Date(00-00-1970) Fri, 02-Jan-1970 00:00:00 GMT
 */
Q.setCookie = function(name, value, options) {
	options = options || {};
	var expires = options.expires || null;
	var path = options.path || "/";
	var domain = options.domain || document.domain;
	var secure = options.secure || null;
	document.cookie = name + "=" + escape(value) 
	+ ((expires) ? "; expires=" + expires.toGMTString() : "") 
	+ "; path=" + path
	+ "; domain=" + domain 
	+ ((secure) ? "; secure" : "");
};