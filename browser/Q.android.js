/**
 * 判断是否android平台
 * @name Q.android
 * @example
   Q.android
 * @return {Boolean} 布尔值
 */
Q.android = function() {
	return /android/i.test(Q._ua()) ? true : false;
};