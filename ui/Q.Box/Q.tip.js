/**
 * 信息提示框，默认2秒后消失
 * @name Q.tip
 * @param {String} message 需要显示的内容，支持HTML
 * @auther wangzhishou@qq.com
 */
Q.tip = function(message, options) {	
	if (!this.tipBox) {
		this.tipBox   = new Q.Box();	
	}
	var _this = this;
	options       	  = options || {};
	options.id        = options.id || "Qtip";
	options.title     = options.title || null;
	options.showClose = options.showClose || false;
	options.maskClick = options.maskClick || false;
	options.isEffect  = options.isEffect || true;
	var html = '<div id="QtipMessage"><div class="mText">' + message + '</div></div>';
	setTimeout(function(){
		_this.tipBox.closeBox();
	}, 2000)
	return this.tipBox.show(html, options);
};