/**
 * 声明Q包, 并获取Dom对象的封装
 * @name Q
 * @namespace Q
 * @version 0.0.1
 * @description  Q，更少的字符，方便书写。
 * @param {string | HTMLElement} element 页面元素对象或元素对象的id
 * @return {Element} dom元素
 */
var Q = function(element) {
		if (!element) {
			return null;
		}
		if (element.constructor == String) {
			element = document.getElementById(element);
		}
		return element;
	};