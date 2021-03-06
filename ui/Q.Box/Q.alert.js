/**
 * 弹出确认框
 * @name Q.alert
 * @param {String} message 需要显示的内容，支持HTML
 * @auther wangzhishou@qq.com
 */
Q.alert = function(message, options) {	
	if (!this.alertBox) {
		this.alertBox   = new Q.Box();	
	}
	var _this = this;
	var options       = {};
	options.id        = "Qalert";
	options.title     = null;
	options.showClose = false;
	options.maskClick = false;
	options.isEffect  = false;
	options.buttons   = {
		"确定" : {
			"id" : "QalertSubmit",
			"className" : "button green",
			"callBack" : {
				"click" : function() {
					_this.alertBox.closeBox();
				}
			}
		}
	}
	var html = '<div id="QalertMessage">' + message + '</div>';
	return this.alertBox.show(html, options);
};