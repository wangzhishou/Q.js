/**
 * 获取元素纵向滚动量
 * @name 
   Q.scrollTop
 * @example
   Q.scrollTop()
 * @param ｛String || HtmlElement｝[target] 元素对象，默认是document
 * @return {number} 获取纵向滚动量
 */
Q.scrollTop = function (target) {    
    if(!target) {
    	var d = document;
    	return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
    } else {
    	return target.scrollTop;
    }
};