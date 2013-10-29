/**
 * 移除元素的className
 * @name Q.removeClass
 * @example Q.removeClass(element[, classNames])
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 可选参数，要移除的className，允许同时移除多个class，中间使用空白符分隔, 如果为空, 元素cLassName置为空
 * @return {HTMLElement} 目标元素
 */
Q.removeClass = function(element, classNames) {
    element = Q(element);
    var oldClass = element.className.split(/\s+/);
    var newClass = classNames.split(/\s+/);
    var len = oldClass.length;
    var n = newClass.length;
    for (var i = 0; i < n; i++) {
        while (len--) {
            if (oldClass[len] == newClass[i]) {
                oldClass.splice(len, 1);
                break;
            }
        }
    }
    element.className = oldClass.join(' ');
    return element;
};