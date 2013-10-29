/**
 * 获取目标元素所属的document对象
 * @name Q.getDocument
 * @example 
 	baidu.dom.getDocument(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id             
 * @returns {HTMLDocument} 目标元素所属的document对象
 */
Q.getDocument = function(element) {
	element = Q(element);
	return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};