/**
 * 寻找匹配的目标元素
 * @name Q.matchNode
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             container 遍历的方向名称，取值为previousSibling,nextSibling
 * @return {HTMLElement} 搜索到的元素，如果没有找到，返回 null
 */
Q.matchNode = function(element, container) {
	element = Q(element);
	var node;
	while (node = element[container]) {
		if (node.nodeType == 1) {
			return node;
		}
	}
	return null;
};