/**
 * 声明Q包, 并获取Dom对象的封装
 * @name Q
 * @namespace Q
 * @version 0.0.1
 * @description  Q，更少的字符，方便书写。
 * @param {string | HTMLElement} selector  支持css3的选择器
 * @return {Element} dom元素
 */
var Q = function(selector) {
	if (selector.constructor == String) {
		var result = [];
		try {
			result = document.querySelectorAll(selector);
		} catch (e) {
			result = Q.Sizzle(selector);
		} finally {
			if (result.length == 1 && /^(?:#([\w-]+))$/.test(selector)) {
				return result[0];
			} else {
				return result.length == 0 ? null : result;
			}
		}
	}
	return selector;
};