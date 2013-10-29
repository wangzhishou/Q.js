/**
 * ����ȷ�Ͽ�
 * @name Q.confirm
 * @param {String} message ��Ҫ��ʾ�����ݣ�֧��HTML
 * @param {Function} acceptFun ȷ�Ͻ��ܺ�ص�����
 * @param {Function} cancelFun ȡ���ص�����
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
		"ȷ��" : {
			id : "QconfirmSubmit",
			class : "button green",
			callBack : {
				"click" : function() {
					box.closeBox();
					acceptFun && acceptFun();
				}
			}
		},
		"ȡ��" : {
			id : "QconfirmCancel",
			class : "button blue",
			callBack : {
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