/**
 * 使用淡入效果来显示一个隐藏的元素。
 * @name  Q.fadeIn
 * @example
 * <pre>
 *   Q.fadeIn(document.getElementById("test"), 1000, fn);
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Number} duration 动画的持续时间长度,单位毫秒
 * @param {Number} callback 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
 Q.fadeIn = function(element, duration, callback) {
 	duration = duration || 2000;
 	callback = callback || function(){};
 	Q.show(element);
 	return Q.tween(element, {opacity:1}, {onComplete:callback, duration:duration})
 };