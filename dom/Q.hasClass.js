/**
 * 判断元素是否拥有指定的className
 * @name Q.hasClass
 * @function
 * @example Q.hasClass(element, classNames)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 要判断的className，可以是用空格拼接的多个className
 * @see Q.addClass, Q.removeClass
 *
 * @returns {Boolean} 是否拥有指定的className，如果要查询的classname有一个或多个不在元素的className中，返回false
 */
Q.hasClass = function(element, classNames) {

	element = Q(element);
	
	if (!element.nodeType === 1) {
		return false;
	}

	var classArray = Q.trim(classNames).split(/\s+/),
		len = classArray.length;

	className = element.className.split(/\s+/).join(" ");

	while (len--) {
		if (!(new RegExp("(^| )" + classArray[len] + "( |$)")).test(className)) {
			return false;
		}
	}
	return true;
};