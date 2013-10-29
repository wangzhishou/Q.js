/**
 * 阻止事件传播
 * @name Q.stopPropagation
 * @function
 * @example 
   Q.stopPropagation(event)
 * @param {Event} event 事件对象
 */
Q.stopPropagation = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};