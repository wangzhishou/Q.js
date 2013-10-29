/**
 * 寻找匹配的目标元素
 * @name Q.matchNode
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             prop 遍历的方向名称，取值为previousSibling,nextSibling
 * @return {HTMLElement} 搜索到的元素，如果没有找到，返回 null
 */
Q.matchNode = function(element, prop) {
	element = Q(element);
	while (element = element[prop]) {
		if (element.nodeType == 1) {
			return element;
		}
	}
	return null;
};