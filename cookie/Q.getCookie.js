/**
 * 获取cookie的值
 * @name Q.getCookie
 * @example 
   Q.getCookie(name)
 * @param {string} name 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值，获取不到时返回null
 */
Q.getCookie = function(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name
			+ "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(arr[2]);
	}
	return null;
};