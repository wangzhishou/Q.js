/**
 * 使用的Safari浏览器的版本号，如果是0表示不是此浏览器
 * @name Q.Safari
 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
 * @return {Number} 返回浏览器的版本号
 */
Q.safari = function() {
	return /version\/([\d.]+).*safari/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};