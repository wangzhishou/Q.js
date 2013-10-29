/**
 * 通过自定义别名属性(非原生属性)获取元素
 * @name Q.alias
 * @example Q.alias(attribute[, context, tagName])
 * @param {String} attribute 元素的自定义别名属性。
 * @param {HTMLElement} context 开始搜索查找的上下文，默认是document。
 * @param {String|HTMLElement} [tagName] 指定回去元素的标签名称，默认是所有标签。
 * @remark
 *
 *  不保证返回数组中DOM节点的顺序和文档中DOM节点的顺序一致。
 *
 * @return {Array} 获取的元素集合，查找不到或attribute参数错误时返回空数组.
 */
Q.alias = function(attribute, context, tagName) {
	var results = [];
	if (!context) {
		context = document;
	}
	if (!tagName) {
		tagName = '*';
	}
	var els = context.getElementsByTagName(tagName);
	var len = els.length;
	for (i = 0, j = 0; i < len; i++) {
		var el = els[i];
		var attr = Q.attr(el, attribute);
		if (attr) {
			results[j++] = el;
		}
	}
	return results;
};