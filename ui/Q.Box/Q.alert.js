/**
 * ����ȷ�Ͽ�
 * @name Q.alert
 * @param {String} message ��Ҫ��ʾ�����ݣ�֧��HTML
 * @auther wangzhishou@qq.com
 */
Q.alert = function(message, options) {	
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
	options.buttons   = {
		"ȷ��" : {
			"id" : "QalertSubmit",
			"className" : "button green",
			"callBack" : {
				"click" : function() {
					_this.box.closeBox();
				}
			}
		}
	}
	var html = '<div id="QalertMessage">' + message + '</div>';
	return this.box.show(html, options);
};