/**
 * 判断是否iphone平台
 * @name Q.iphone
 * @example
   Q.iphone
 * @return {Boolean} 布尔值
 */
Q.iphone = function() {
	return /iphone/i.test(Q._ua()) ? true : false;
};