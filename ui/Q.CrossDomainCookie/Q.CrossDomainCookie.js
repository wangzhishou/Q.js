/**
 * 用作cookie 代理相关的函数操作， 需要 Ffunction.js 否则需要将 cookie 部分copy出来 
 * 
 * @example 
 * 应用示例： 代理页面实现如下： * 
 * try { 
 * 		document.domain='a.com'; 
 *  }catch(e){}
 * 
 * function g(n) { 
 * 		var a = document.cookie.match(new RegExp("(^| ?)"+n+"=([^;]*)(;|$)")); 
 * 		return a == null?"":unescape(a[2]); 
 * } 
 * 
 * 获取cookie 
 * var cf = new Q.CrossDomainCookie("test","http://www.a.com/cookie/cookie.shtml",function(){
 * 		alert("load finished"); 
 * 		alert(cf.getCookie("autoapp_test")); 
 * });
 * @param {String} src 请求的跨域代理文件
 * @param {function} [fun] 可选参数，回调函数
 */
Q.CrossDomainCookie = function (src, fun) {
	this._cf = document.createElement("iframe");
	this._cf.id = "CrossDomainCookieFrame" +  + (new Date()).getTime();
	this._cf.style.display = "none";
	document.body.appendChild(this._cf);
	this._cf.src = src;
	if (fun) {
		Q.on(this._cf, 'load', fun);
	}
};

Q.CrossDomainCookie.prototype = {
	/**
	 * 获取代理中的cookie 需要有一个代理页面，同时页面中需要有 g 函数
	 */ 
	getCookie : function(name) {
		try {
			return this._cf.contentWindow.g(name);
		} catch (e) {
			return null;
		}
	}
};
