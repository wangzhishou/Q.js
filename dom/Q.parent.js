/**
 * 获得元素的父节点
 * @name Q.parent
 * @function
 * @example Q.parent(element[, fun])
 * <pre>
 * <h4>获取元素指定标签的最近的祖先元素：</h4>
 * Q.parent(element, function(p) {
 * 		return (p.tagName == tagName) ? true : false;
 * });
 * <h4>获取目标元素指定元素className最近的祖先元素：</h4>
 * Q.parent(element, function(p) {
 * 		return Q.hasClass(p, "className");
 * });
 * </pre>
 * @param {HTMLElement|string} element   目标元素或目标元素的id 
 * @param {Function} fun 可选参数, 默认是null, 匹配自定义条件的函数, 返回匹配条件的Boolean值。
 * @returns {HTMLElement|null} 父元素，如果找不到父元素，返回null
 */
Q.parent = function(element, fun) {
	element = Q(element);
	fun = fun ? fun : function() {
		return true;
	};
	while ((element = element.parentNode) && element.nodeType == 1) {
		if (fun(element)) {
			return element;
		}
	}
	return null;
};