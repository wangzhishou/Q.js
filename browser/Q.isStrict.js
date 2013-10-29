/**
 * 判断浏览器的工作模式，Standards Mode和Quirks Mode
 * @name Q.isStrict
 * @description  document.compatMode它有两种可能的返回值：BackCompat和CSS1Compat
 * @return {Boolean} 布尔值 true --> Standards Mode  false --> Quirks Mode
 */
Q.isStrict = function() {
	return document.compatMode == "CSS1Compat" ? true : false;
};