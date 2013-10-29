/**
 * 为目标元素添加事件监听器
 * @name Q.on
 * @example 
   Q.on(element, type, listener)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要添加的监听器
 * @param {Boolean} [useCapture] 标准浏览器下事件的响应顺序
 * @remark 
	不支持跨浏览器的鼠标滚轮事件监听器添加
 */
Q.on = function(element, type, listener, useCapture) {
	type = type.replace(/^on/i, '');
	if (element.addEventListener) {
		useCapture = useCapture ? useCapture : false;
		element.addEventListener(type, listener, useCapture);
	} else if (element.attachEvent) {
		element.attachEvent('on' + type, function() {
			return listener.call(element, window.event);
		});
	}
}