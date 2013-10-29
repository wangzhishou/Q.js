/**
 * 在目标元素的指定位置插入HTML代码
 *
 * @name Q.insertHTML
 * @param {HTMLElement | String} elem 指定的DOM节点
 * @param {String} where 指定的插入地点，目前支持四个点：beforeBegin afterBegin beforeEnd afterEnd
 * @param {String} html 需要被插入的HTML字符
 */
Q.insertHTML = function(elem, where, html) {
    elem = Q(elem);
    if (elem.insertAdjacentHTML) {
        elem.insertAdjacentHTML(where, html);
    } else if (typeof HTMLElement != "undefined" && !window.opera) {
        var e = elem.ownerDocument.createRange();
        e.setStartBefore(elem);
        e = e.createContextualFragment(html);

        switch (where.toLowerCase()) {
        case 'beforebegin':
            elem.parentNode.insertBefore(e, elem);
            break;
        case 'afterbegin':
            elem.insertBefore(e, elem.firstChild);
            break;
        case 'beforeend':
            elem.appendChild(e);
            break;
        case 'afterend':
            if (!elem.nextSibling) elem.parentNode.appendChild(e);
            else elem.parentNode.insertBefore(e, elem.nextSibling);
            break;
        }
    }
};