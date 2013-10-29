/**
 * 对目标字符串进行html编码
 * @name Q.encodeHTML
 * @example
   Q.encodeHTML(str)
 * @param {string} str 目标字符串
 * @remark
 * 编码字符有5个：&<>"'
 *             
 * @return {string} html编码后的字符串
 */
Q.encodeHTML = function(str) {
	return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
};