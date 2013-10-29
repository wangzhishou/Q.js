/**
 * Tab控件
 * @name Q.Tab.js
 * @param {String | HTMLElement} [options.container] Tab按钮所在的容器
 * @param {String} [options.className] tab按钮样式
 * @param {String} [options.eventType] 控件数据切换事件触发类型，默认是click事件.
 * @param {function} [options.eventCallback] 事件触发后回调函数
 * @version Revision: 1.0
 * @constructor Tab
 * @author wangzhishou@qq.com
 */
Q.Tab = function(options) {
	if (options) {
		this.className = options.className || "uiTab";
		this.container = options.container || document;
		this.eventType = options.eventType || "click";
		this.eventCallback = options.eventCallback || null;
	}
	this.init();
}

Q.Tab.prototype = {
	/**
	 * 指定构造函数名称
	 */
	constructor: 'Q.Tab',

	/**
	 * 需要显示的元素
	 * @param {String | HTMLElement} container 用于初始化控件的容器
	 */
	show: function(element) {
		element = Q(element);
		var parent = this.getParent(element);
		if (Q.hasClass(parent, 'tabsSelected')) {
			return
		}
		this.reset();
		var target = this.getTarget(element);
		Q.show(target);
		Q.addClass(parent, 'tabsSelected');
	},

	/**
	 * 重置
	 */
	reset: function() {
		var tabs = Q.q("uiTab", this.container, "a");
		for (var i = 0, n = tabs.length; i < n; i++) {
			var element = tabs[i];
			var parent = this.getParent(element);
			Q.removeClass(parent, 'tabsSelected');
			var target = this.getTarget(element);
			Q.hide(target);
		}
	},

	/**
	 * 获取tab元素的父级
	 * @param {HTMLElement} element 元素对象
	 */
	getParent: function(element) {
		var parent = Q.parent(element, function(p) {
			return (p.tagName.toLowerCase() == 'li') ? true : false;
		});
		return parent;
	},

	/**
	 * 获取tab按钮所对应容器
	 * @param {HTMLElement} element 元素对象
	 */
	getTarget: function(element) {
		var href = Q.attr(element, 'href');
		var match = href.match(/#([^\s]*)$/);
		var targetId;
		if (match) {
			targetId = match[1];
		}
		return targetId;
	},

	/**
	 * 初始化,添加事件控制
	 */
	init: function() {
		Q.on(Q(this.container), this.eventType, this.eventTypeHandler());
	},

	/**
	 * 事件触发函数
	 * @param {HtmlElement} element 绑定事件元素
	 */
	eventTypeHandler: function() {
		var _this = this;
		return function(e) {
			var event = Q.getEvent(e);
			var target = Q.getTarget(event);
			Q.preventDefault(event);
			var parent = Q.parent(target);
			target = parent.tagName.toLowerCase() == "a" ? parent : target;
			_this.show(target);
			if (_this.eventCallback) {
				_this.eventCallback.call(target, event);
			}
		}
	}
};