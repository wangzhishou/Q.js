/**
 * 执行其中的的 JavaScript 代码
 * @name Q.evalScripts
 * @auther wangzhishou.com
 * @example 
   Q.evalScripts(str);
 * @param {String} str 函数可执行其中的的 JavaScript 代码。
 * @remark
   window.execScript() 所执行后的脚本上文是针对整个全局域的
   window.eval 方法，在 IE6 IE7 IE8 中依然在脚本所在上下文中执行
 */
Q.evalScripts = function(str) {
	var resultAll = Q.extractTags(str, "script");
    Q.each(resultAll, function(key, val) {
		if(window.execScript) {
			window.execScript(val);
		} else {
			window.eval(val);		
		}
    });
};