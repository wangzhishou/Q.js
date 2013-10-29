/**
 * 获取Chrome浏览器的版本号
 * @name Q.chrome
 * @example
   Q.firefox
 * @return {Number} Chrome浏览器的版本号，如果是0表示不是此浏览器
 */
Q.chrome = function() {
	return /chrome\/([\d.]+)/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};