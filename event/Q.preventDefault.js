/**
 * 阻止事件的默认行为
 * @name Q.preventDefault
 * @example 
   Q.preventDefault(event)
 * @param {Event} event 事件对象
 * @event standard 标准事件模型
 */
Q.preventDefault = function(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
};