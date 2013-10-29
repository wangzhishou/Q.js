/**
 * 隐藏目标元素
 * @name Q.hide
 * @example
   Q.hide(element)
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.hide = function() {
	for (var i = 0, n = arguments.length; i < n; i++) {
		Q(arguments[i]).style.display = "none";
	}
};