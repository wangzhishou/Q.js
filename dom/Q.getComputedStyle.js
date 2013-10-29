/**
 * 获取目标元素的computed style值。
 * @name Q.getComputedStyle
 * @example 
   Q.getComputedStyle(element, style)
 * @remark 
   如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} style 要获取的样式名             
 * @return {string} 目标元素的computed style值
 */
Q.getComputedStyle = function(element, style) {
    element = Q(element);
    var doc = Q.getDocument(element),
        styles;
    if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
            return styles[style] || styles.getPropertyValue(style);
        }
    }
    return '';
};