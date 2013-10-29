/**
 * 获取目标元素相对于整个文档左上角的位置
 * @name Q.getPosition
 * @example
   Q.getPosition(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id 
 * @remark 
   opera, gecko内核等浏览器bug没有修复         
 * @return {Object} 目标元素的位置，键值为top和left的Object。
 */
Q.getPosition = function(element) {
    element = Q(element);
    var doc = Q.getDocument(element),
        getStyle = Q.css,
        pos = {
            "left": 0,
            "top": 0
        },
        viewport = (Q.ie() && !Q.isStrict()) ? doc.body : doc.documentElement,
        parent, box;

    if (element == viewport) {
        return pos;
    }

    if (element.getBoundingClientRect) {
        box = element.getBoundingClientRect();

        pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);

        pos.left -= doc.documentElement.clientLeft;
        pos.top -= doc.documentElement.clientTop;

        var htmlDom = doc.body,
            htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
            htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
        if (Q.ie() && !Q.isStrict()) {
            pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
            pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
        }
    } else {
        parent = element;

        do {
            pos.left += parent.offsetLeft;
            pos.top += parent.offsetTop;
            if (Q.webkit() > 0 && getStyle(parent, 'position') == 'fixed') {
                pos.left += doc.body.scrollLeft;
                pos.top += doc.body.scrollTop;
                break;
            }

            parent = parent.offsetParent;
        } while (parent && parent != element);

        if (Q.opera() > 0 || (Q.webkit() > 0 && getStyle(element, 'position') == 'absolute')) {
            pos.top -= doc.body.offsetTop;
        }

        parent = element.offsetParent;
        while (parent && parent != doc.body) {
            pos.left -= parent.scrollLeft;
            parent = parent.offsetParent;
        }
    }

    return pos;
};