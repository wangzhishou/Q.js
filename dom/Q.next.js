/**
 * 获取目标元素的下一个兄弟元素节点
 * @name Q.next
 * @function
 * @example Q.next(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @returns {HTMLElement|null} 目标元素的下一个兄弟元素节点，查找不到时返回null
 */
Q.next = function (element) {
    return Q.matchNode(element, 'nextSibling');
};