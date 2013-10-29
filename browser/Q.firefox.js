/**
 * 获取firefox浏览器版本号
 * @name Q.firefox
 * @example
   Q.firefox
 * @return {Number} firefox版本号，如果是0表示不是此浏览器
 */
Q.firefox = function() {
	return /firefox\/(\d+\.\d+)/i.test(Q._ua) ? + RegExp['$1'] : 0;
};