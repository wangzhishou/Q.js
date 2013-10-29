/**
 * 判断是否为ie浏览器
 * @name Q.ie
 * @remark
   IE > 8浏览器下，以documentMode为准
 * @example
   Q.ie
 * @return {Number} ie浏览器版本号,如果是0表示不是此浏览器
 */
Q.ie = function() {
	return /msie (\d+\.\d+)/i.test(Q._ua()) ? +RegExp['$1'] : 0;
};