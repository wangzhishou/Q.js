/**
 * 判断是否ipad平台
 * @name Q.ipad
 * @example
   Q.ipad
 * @return {Boolean} 布尔值
 */
Q.ipad = function() {
	return /ipad/i.test(Q._ua()) ? true : false;
};