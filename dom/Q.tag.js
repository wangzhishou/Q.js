/**
 * 创建 Element 对象。
 * @author wangzhishou@qq.com
 * @name Q.tag
 * @example 
   Q.tag(tagName[, options])
 * @param {string} tagName 标签名称.
 * @param {Object} options 元素创建时拥有的属性，如style和className.
 * @return {HTMLElement} 创建的 Element 对象
 */
Q.tag = function(tagName, options) {
    var element = document.createElement(tagName),
        options = options || {};
    for (var key in options) {
        Q.attr(element, key, options[key]);
    }
    return element;
};