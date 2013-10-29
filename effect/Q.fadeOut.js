/**
 * 使用淡出效果来隐藏一个元素：。
 * @name  Q.fadeOut
 * @example
 * <pre>
 *   Q.fadeOut(document.getElementById("test"), 1000, fn);
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Number} duration 动画的持续时间长度,单位毫秒
 * @param {Number} callback 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
 Q.fadeOut = function(element, duration, callback) {
 	duration = duration || 2000;
 	function onComplete() {
 		callback || callback();
 		Q.hide(element);
 	}
 	return Q.tween(element, {opacity:0}, {onComplete:callback, duration:duration})
 };