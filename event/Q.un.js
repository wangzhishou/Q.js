/**
 * 为目标元素移除事件监听器
 * @name Q.un
 * @function
 * @example
   Q.un(element, type, listener)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要移除的监听器
 * @param {Boolean} [useCapture] 标准浏览器下事件的响应顺序            
 * @return {HTMLElement|window} 目标元素
 */
Q.un = function(element, type, listener, useCapture){
	type = type.replace(/^on/i, '').toLowerCase();
	if (element.removeEventListener) {
		useCapture = useCapture ? useCapture : false;
		element.removeEventListener(type, listener, useCapture);
	} else if (element.detachEvent) {
		element.detachEvent('on' + type, listener);
	}
}