/**
 * 获取浏览器的navigator.userAgent
 * @name Q._ua
 * @description 为了降低字节数，临时缓存一下
 * @return String
 */
Q._ua = function() {
	return navigator.userAgent.toLowerCase();
};