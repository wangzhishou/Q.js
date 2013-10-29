/**
 * 获取或设置目标元素的属性值
 * @name Q.attr
 * @function
 * @grammar Q.attr(element, key[, value])
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取或设置的attribute键名
 * @param {string} value 要设置的attribute值
 *
 * @returns {string|null} 目标元素的attribute值，获取不到时返回null
 */
Q.attr = function(element, key, value) {
	element = Q(element);

	if ('style' == key) {
		if (value) {
			element.style.cssText = value;
			return element;
		} else {
			return element.style.cssText;
		}
	}
	key = Q._propFix[key] || key;
	if (value) {
		element.setAttribute(key, value);
		return element;
	} else {
		return element.getAttribute(key);
	}
};