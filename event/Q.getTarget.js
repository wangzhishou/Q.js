/**
 * 获取事件的触发元素
 * @name Q.getTarget
 * @example
   Q.getTarget(event)
 * @param {Event} event 事件对象
 * @return {HTMLElement} 事件的触发元素
 */
Q.getTarget = function (event) {
    return event.target || event.srcElement;
};