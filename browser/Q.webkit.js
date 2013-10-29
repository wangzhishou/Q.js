/**
 * 判断是否为webkit内核
 * @name Q.webkit
 * @example
   Q.webkit
 * @return {Boolean} 布尔值
 */
Q.webkit = function() {
	return /webkit/i.test(Q._ua()) ? true : false;
};