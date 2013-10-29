/**
 * 动态在页面上加载一个外部js文件
 * @name Q.loadJs
 * @example 
   Q.loadJs(params)
 * @param {string} params.src 必选参数，js文件路径
 * @param {string} [params.id] 可选参数，加载js的id
 * @param {Function} [params.callback] 可选参数，加载完成回调函数 
 * @param {Function} [params.isRemove] 可选参数，加载的js文件是否删除，默认是删除
 * @param {Function} [params.charset] 可选参数，指定字符集，默认是gb2312
 */
Q.loadJs = function(params) {
	params.id       = params.id || "LoadedJs" + new Date().getTime();
	params.isRemove = params.isRemove || true;
	var _script     = document.createElement("script");
	_script.id      = params.id;
	_script.type    = "text/javascript";
	_script.charset = params.charset || "gb2312";
	var callback    = function() {
		params.callback && params.callback();
		if (params.isRemove) {
			Q.remove(params.id);
		}
	};
	if (_script.readyState) { //IE
		_script.onreadystatechange = function() {
			if (_script.readyState == "loaded" || _script.readyState == "complete") {
				_script.onreadystatechange = null;
				callback();
			}
		};
	} else { //Others
		_script.onload = function() {
			callback();
		};
	}
	_script.src = params.src;
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(_script, s);
};