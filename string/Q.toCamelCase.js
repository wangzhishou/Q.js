/**
 * 将目标字符串进行驼峰化处理
 * @name Q.toCamelCase
 * @example 
   Q.toCamelCase("font-size"); 
 * @param {string} source 目标字符串
 * @remark
 * 支持单词以“-_”分隔             
 * @returns {string} 驼峰化处理后的字符串
 */
Q.toCamelCase = function(source) {
	if (source.indexOf('-') < 0) {
		return source;
	}
	return source.replace(/[-][^-]/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
};