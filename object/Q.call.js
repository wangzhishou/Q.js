/**
 * 调用函数, 不支持事件对象的传递
 * @param {Function || string} fnName 需要调用的函数 
 * @param {Object} [param] 可选参数，调用函数传递的参数
 */
Q.call = function(fnName, param) {
	param = param || {};
	if(Q.isFunction(fnName)) {
		fnName.call(null, param);
	}
	if(Q.isString(fnName)) {
		var fnlist = fnName.split(".");
		var n = fnlist.length, i = 0;
		var callee = window;
		while( i < n) {
		    var k = fnlist[i];
		    callee = callee[k];
		    i++;
		}
		callee.call(k, param);
	}
};