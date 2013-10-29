/**
 * 通过className获取元素
 * @name Q.q
 * @grammar Q.q(className[, context, tagName])
 * @param {String} className 元素的class。
 * @param {HTMLElement} context 开始搜索查找的上下文，默认是document。
 * @param {String|HTMLElement} [tagName] 指定回去元素的标签名称，默认是所有标签。
 * @remark
 *
 *  不保证返回数组中DOM节点的顺序和文档中DOM节点的顺序一致。
 *
 * @returns {Array} 获取的元素集合，查找不到或className参数错误时返回空数组.
 */
Q.q = function(className, context, tagName) {
	var results = [];
	if (!context) {
		context = document;
	}
	if (!tagName) {
		tagName = '*';
	}
	var els = context.getElementsByTagName(tagName);
	var len = els.length;
	var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
	for (i = 0, j = 0; i < len; i++) {
		var el = els[i];
		if (pattern.test(el.className)) {
			results[j++] = el;
		}

	}
	return results;
};