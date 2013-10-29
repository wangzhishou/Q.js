/**
 * 获取事件对象
 * @name Q.getEvent
 * @example
   Q.getEvent()
 * @return {Event} event对象.
 */
Q.getEvent = function() {
	if (window.event) {
		return window.event;
	} else {
		var f = arguments.callee;
		do {
			if (/Event/.test(f.arguments[0])) {
				return f.arguments[0];
			}
		} while (f = f.caller);
		return null;
	}
};