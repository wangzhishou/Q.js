/**
 * 阻止事件传播
 * @name Q.stopBubble
 * @function
 * @example Q.stopBubble(event)
 * @param {Event} event 事件对象
 */
Q.stopBubble = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};