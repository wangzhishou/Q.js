/**
 * 删除目标元素
 * @name Q.remove
 * @example
   Q.remove(element)
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.remove = function() {
	var elm;
	for (var i = 0, n = arguments.length; i < n; i++) {
		elm = Q(arguments[i]);
		try {
			elm.parentNode.removeChild(elm);
		} catch (e) {}
	}
};