/**
 * 获取opera浏览器的版本号
 * @name Q.opera
 * @example
   Q.opera
 * @return {Number} opera浏览器的版本号，如果是0表示不是此浏览器
 */
Q.opera = function() {
	return /opera.([\d.]+)/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};