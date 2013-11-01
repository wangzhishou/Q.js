/**
 * 弹出确认框
 * @name Q.confirm
 * @param {String} message 需要显示的内容，支持HTML
 * @param {Function} acceptFun 确认接受后回调函数
 * @param {Function} cancelFun 取消回调函数
 * @auther wangzhishou@qq.com
 */
Q.confirm = function(message, acceptFun, cancelFun) {	
	var box           = new Q.Box();
	var options       = {};
	options.id        = "Qconfirm";
	options.title     = null;
	options.showClose = false;
	options.maskClick = false;
	options.isEffect  = false;
	options.buttons   = {
		"确定" : {
			"id" : "QconfirmSubmit",
			"class" : "button green",
			"callBack" : {
				"click" : function() {
					box.closeBox();
					acceptFun && acceptFun();
				}
			}
		},
		"取消" : {
			"id" : "QconfirmCancel",
			"class" : "button blue",
			"callBack" : {
				"click" : function() {
					box.closeBox();
					cancelFun && cancelFun();
				}
			}
		},
	}
	var html = '<div id="QconfirmMessage">' + message + '</div>';
	return box.show(html, options);
};