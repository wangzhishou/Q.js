/**
 * 删除目标字符串两端的空白字符
 * @name Q.trim
 * @function
 * @grammar Q.trim(str)
 * @param {string} str 目标字符串
 * @remark
 * 不支持删除单侧空白字符
 *
 * @returns {string} 删除两端空白字符后的字符串
 */
Q.trim = function(str) {
	var pattern = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
	return String(str).replace(pattern, '');
}