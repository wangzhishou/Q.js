/**
 * 为元素添加className
 * @name Q.addClass
 * @example Q.addClass(element, classNames)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 要添加的className，允许同时添加多个class，中间使用空白符分隔 *
 * @return {HTMLElement} 目标元素
 */
Q.addClass = function(element, classNames) {
    element = Q(element);

    var classArray = classNames.split(/\s+/),
        result = element.className,
        oldClass = " " + result + " ",
        i = 0,
        l = classArray.length;

    for (; i < l; i++) {
        if (oldClass.indexOf(" " + classArray[i] + " ") < 0) {
            result += (result ? ' ' : '') + classArray[i];
        }
    }

    element.className = Q.trim(result);
    return element;
};