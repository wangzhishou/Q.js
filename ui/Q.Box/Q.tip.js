/**
 * 信息提示框，默认2秒后消失
 * @name Q.tip
 * @param {String} message 需要显示的内容，支持HTML
 * @auther wangzhishou@qq.com
 */
Q.tip = function(message, options) {	
	if (!this.box) {
		this.box   = new Q.Box();	
	}
	var _this = this;
	var options       = {};
	options.id        = "Qalert";
	options.title     = null;
	options.showClose = false;
	options.maskClick = false;
	options.isEffect  = false;
	var html = '<div id="QalertMessage">' + message + '</div>';
	return this.box.show(html, options);
};