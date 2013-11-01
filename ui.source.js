/**
 * 模仿ColorBox创建一个基于Q.js控件, 命名为Box
 * @auther wangzhishou@qq.com
 * @date 2012-08-16
 * @See http://jacklmoore.com/colorbox for details.
 */

/**
 * 主函数
 * @name Q.Box 
 * @example  
   Q.Box(content, options)
 * @param {String || url} content 需要展示的内容类型，如果options.type是非string类型，按照url请求内容。
 * @param {Object} options 选项参数
 * @param {String} [options.id] 可选参数，UI控件元素的id名称，默认是QBox
 * @param {String} [options.type] 可选参数，需要展现的内容类型，ajax、image、iframe、string，默认是String
 * @param {Number} [options.width] 可选参数，浮层区域宽度，默认是内容自适应。
 * @param {Number} [options.height] 可选参数，浮层区域高度，默认是内容自适应。
 * @param {String} [options.title] 可选参数，浮层标题，默认是无。
 * @param {String || function} [options.onClose] 可选参数，关闭以后回调函数
 * @param {String || function} [options.onClick] 可选参数，点击以后回调函数
 * @param {boolean} [options.isLoading] 可选参数，是否显示loading区域
 * @param {boolean} [options.isEffect] 可选参数，是否有动画效果
 * @param {boolean} [options.maskClick] 可选参数，背景遮罩是否点击，点击后关闭覆层
 * @param {boolean} [options.buttons] 可选参数，是否显示按钮操作栏，按钮对象如下:
 * 	{
		"确定" : {
			id : "QalertSubmit",
			class : "button green",
			callBack : {
				"click" : function() {
					box.closeBox();
				}
			}
		}
	｝
 */
Q.Box = function(options) {
	this.options = options || {};
	this.enable  = true;
};

/**
 * 给Q.Box新增属性
 */
Q.Box.prototype = {
	/**
	 * 显示浮层
	 */
	show : function(content, options) {
		options           = options || this.options;
		options.onclick   = options.onclick || function(){};
		options.onclose   = options.onclose || function(){};
		options.isEffect  = Q.isUndefined(options.isEffect)  ?  true : options.isEffect;
		options.isLoading = Q.isUndefined(options.isLoading) ? true : options.isLoading;
		options.showClose = Q.isUndefined(options.showClose) ? true : options.showClose;
		options.maskClick = Q.isUndefined(options.maskClick) ? false : options.maskClick;
		options.id        = options.id || "QBox";
		this.id           = options.id;
		this.creat(options);
		var type         = options.type || "string";
		type             = type.toLowerCase();
		switch (type) {
			case "ajax":
				this.showAjax(content, options);
				break;
			case "image":
				this.showImage(content, options);
				break;
			case "iframe":
				this.showIframe(content, options);
				break;
			case "string":
			default:
				this.showContent(content, options);
				break;
		}
		return this;
	},

	/**
	 * 是否初始化
	 */
	created : false,

	/**
	 * 页面中的UI初始化
	 */
	init : function() {
		var list = Q.alias("q");
		for (var i = 0, n = list.length; i < n; i++) {
			var ele = list[i];
			var q   = Q.attr(ele, "q");
			if (Q.trim(q.toLowerCase()).indexOf("box") == 0) {
				Q.on(ele, "click", this.launchHandle());
			}
		}
	},

	/**
	 * 创建浮层内容及添加事件
	 * @param {Object} options 参数选项
	 */
	creat : function(options) {
		if(!this.created) {
			this.id             = options.id;
			this.overlay        = this.id + "Overlay";
			this.content        = this.id + "Content";
			this.loadedContent  = this.id + "LoadedContent";
			this.loadingGraphic = this.id + "LoadingGraphic";
			this.loadingOverlay = this.id + "LoadingOverlay";
			this.title          = this.id + "Title";
			this.current        = this.id + "Current";
			this.next           = this.id + "Next";
			this.previous       = this.id + "Previous";
			this.slideshow      = this.id + "Slideshow";
			this.closeBtn       = this.id + "CloseBtn";
			this.loadingTmp     = this.id + "LoadingTmp";
			this.btnBar         = this.id + "btnBar";
			this.width          = "550";
			this.height         = "400";
			this.appendHTML(options);
			this.addBindings(options); 
			this.created = true;
		}
	},

	/**
	 * 动态创建控件所需HTML
	 */
	appendHTML : function(options) {
		var box = Q("#" + this.id);
		if (!box && document.body) {
			var styleNone = "display:none";
			var tag = Q.tag;
			box = tag("div", {
				id: this.id
			});
			box.style.cssText = styleNone;
			var overlay = tag("div", {
				id: this.overlay
			});
			overlay.style.cssText = (Q.ie == 6) ? "position:absolute;" + styleNone : styleNone;
			document.body.appendChild(overlay);
			var content = tag("div", {
				id: this.content
			});
			var loaded = tag("div", {
				id: this.loadedContent
			});
			loaded.style.cssText = "width:0; height:0; overflow:hidden";
			content.appendChild(loaded);
			var loadingGraphic = tag("div", {
				id: this.loadingGraphic
			});
			var loadingOverlay = tag("div", {
				id: this.loadingOverlay
			});
			loadingOverlay.appendChild(loadingGraphic);
			content.appendChild(loadingOverlay);
			var title = tag("div", {
				id: this.title
			});
			content.appendChild(title);
			var current = tag("div", {
				id: this.current
			});
			content.appendChild(current);
			var next = tag("div", {
				id: this.next
			});
			content.appendChild(next);

			var previous = tag("div", {
				id: this.previous
			});
			content.appendChild(previous);

			var slideshow = tag("div", {
				id: this.slideshow
			});
			content.appendChild(slideshow);
			var closeBtn = tag("div", {
				id: this.closeBtn,
				style : "display:none"
			});
			content.appendChild(closeBtn);

			var btnBar = tag("div", {
				id: this.btnBar,
				style : "display:none"
			});
			var buttons = options.buttons;
			if (options.buttons) {
				btnBar.style.display = "block";
				for (i in buttons) {
					var v = buttons[i];
					var button = tag("button");
					if (v.id) {
						Q.attr(button, "id", v.id);
					}
					if (v.className) {
						button.className = v.className;
					}
					var callBack = v.callBack;
					if (callBack) {
						for ( j in callBack) {
							Q.on(button, j, callBack[j])
						}
					}
					button.innerHTML = i;
					btnBar.appendChild(button);
				}
			}
			content.appendChild(btnBar);

			box.appendChild(content);
			var loadingTmp = tag("div", {
				id: this.id + "LoadingTmp"
			});
			loadingTmp.style.cssText = "position:absolute;visibility:hidden;left:0;top:0";
			document.body.appendChild(loadingTmp);
			document.body.appendChild(box);
		}
	},

	/**
	 * 给元素绑定事件
	 */
	addBindings : function(options) {
		var box = Q("#" + this.id);
		var self = this;
		if (box) {
			if (!this.inited) {
				var closeBtn = Q("#" + this.closeBtn);
				Q.on(closeBtn, "click", this.closeBoxHandle(options));


				if (options.maskClick) {
					var overlay = Q("#" + this.overlay);
					Q.on(overlay, "click", this.closeBoxHandle(options));
				}
				
				var content = Q("#" + this.content);
				Q.on(content, "click", function(e){
					Q.call(options.onclick);				
				});
			}
		}
	},

	/**
	 * 关闭浮出层
	 */
	closeBox : function(options) {
		var box = Q("#" + this.id);
		if (box) {
			Q.hide("#" + this.overlay, "#" + this.id);
			if (options && options.onclose) {
				var callBack = options.onclose;
				Q.call(callBack);
			}
		}
	},

	/**
	 * 事件触发的关闭浮层
	 */
	closeBoxHandle : function(options) {
		var _this = this;
		return function(e) {
			_this.closeBox(options);
		};
	},

	/**
	 * 快速打开
	 */
	launchHandle : function() {
		var _this = this;
		return function (e) {
			if (!_this.enable) {
				return;
			}
			var event   = Q.getEvent(e);
			var target  = Q.getTarget(event);
			var tagName = target.tagName.toLowerCase();
			switch (tagName) {
			case "a":
				Q.preventDefault(event);
				var url = Q.attr(target, "href");
				var t   = Q.attr(target, "target");
				var q   = Q.attr(target, "q");
				var options = Q.urlToJson(q);				
				_this.show(url, options);
				break;
			default:    
				break;
			}
		};
	},

	/**
	 * 重置样式
	 */
	resetStyle : function() {

	},

	/**
	 * 获取已加载内容区域的宽度和高度
	 */
	getLoadedContentOffset : function(options) {
		var tmp        = {};
		var loadingTmp = Q("#" + this.loadingTmp);	
		tmp.w          = parseInt(options.width || loadingTmp.offsetWidth);
		tmp.h          = parseInt(options.height || loadingTmp.offsetHeight);	
		return tmp;
	},

	/**
	 * 获取内容区域的高度和宽度
	 */
	getContentOffset : function(options) {
		var tmp           = {};
		tmp.w             = 0;
		tmp.h             = 0;
		var content       = Q("#" + this.content);
		var loadedContent = Q("#" + this.loadedContent);
		function getSize(element, v) {
			var val = parseInt(Q.css(element, v), 10);
			return isNaN(val) ? 0 : val;
			
		}
		var widthArray  = ["margin-left", "margin-right", "padding-left", "padding-right","border-left-width", "border-right-width"];
		var heightArray = ["margin-top", "margin-bottom", "padding-top", "padding-bottom","border-top-width", "border-bottom-width"];
		Q.each(widthArray, function(k, v) {	
			tmp.w += getSize(content, v);		
			tmp.w += getSize(loadedContent, v);
		});	
		Q.each(heightArray, function(k, v) {
			tmp.h += getSize(content, v);
			tmp.h += getSize(loadedContent, v);
		});		
		return tmp;
	},

	/**
	 * 显示浮层内容的状态
	 */
	setContentStyle : function(options) {
		var content                 = Q("#" + this.content);
		var loadedContent           = Q("#" + this.loadedContent);
		var loadingTmp              = Q("#" + this.loadingTmp);
		var title 					= Q("#" + this.title);
		content.style.cssText       = "";
		loadedContent.innerHTML     = loadingTmp.innerHTML;
		Q.show("#" + this.overlay, "#" + this.id);
		Q.hide("#" + this.loadingGraphic, "#" + this.loadingOverlay);
		Q.show("#" + this.title);
		loadedContent.style.cssText = Q.format("width:{0}px;height:{1}px;display:block", options.w, options.h);
		content.style.cssText       = "";	
		loadingTmp.innerHTML        = "";
		if (options.title) {
			title.innerHTML = options.title;
		} else {
			title.innerHTML = "";
		}
	},

	/**
	 * 显示浮层
	 */
	showContentBox : function(options) {
		var self                = this;
		var loadingTmp          = Q("#" + this.loadingTmp);
		var content             = Q("#" + this.content);
		var loadedContent       = Q("#" + this.loadedContent);
		var loadingGraphic      = Q("#" + this.loadingGraphic);
		var loadingOverlay      = Q("#" + this.loadingOverlay);
		var title               = this.title;
		var overlay             = Q("#" + this.overlay);
		var id                  = Q("#" + this.id);
		var loadedContentOffset = this.getLoadedContentOffset(options);
		options.w               = loadedContentOffset.w;
		options.h               = loadedContentOffset.h;
		var contentOffset       = this.getContentOffset(options);
		var offsetW             = options.w + contentOffset.w;	
		var offsetH             = options.h + contentOffset.h;	
		function onComplete() {
			self.setContentStyle(options);
		}	
		if (options.isEffect) {
			var clientWidth = Q.clientWidth(); 
			var clientHeight = Q.clientHeight(); 
			var doc = document.body || document.documentElement;
			var left = Math.max(Math.floor(clientWidth / 2 - offsetW / 2), 0);
			var top = Math.max(Math.floor(clientHeight / 2 - offsetH / 2)  + doc.scrollTop, 0);
			var startWidth = content.offsetWidth;
			var startHeight = content.offsetHeight;
			function onTween(rate) {
            	var valWidth = startWidth + (offsetW - startWidth) * rate;
            	var valHeight = startHeight + (offsetH - startHeight) * rate; 
				content.style.cssText = Q.format("height:{0}px;width{1}px", valHeight, valWidth);
			}
			Q.tween("#" + this.id,{left:left,top:top,width:offsetW, height:offsetH}, {duration:500, onComplete:onComplete, onTween:onTween});
		} else {
			onComplete();
			self.autoCenter(offsetW, offsetH);
		}
	},

	/**
	 * 显示loading过程
	 */
	showLoadingBox : function(options) {
		Q.hide("#" + this.title, "#" + this.current, "#" + this.next, "#" + this.previous, "#" + this.slideshow);
		if (!options.isLoading) {
			return false;
		}
		var w = this.width;
		var h = this.height;
		var format = Q.format;
		var loadedContent = Q("#" + this.loadedContent);
		loadedContent.style.cssText = "width: 0px; height: 0px; overflow: hidden;";
		Q.show("#" + this.overlay, "#" + this.id, "#" + this.loadingGraphic, "#" + this.loadingOverlay);
		if (options.showClose) {
			Q.show("#" + this.closeBtn);
		}
		Q("#" + this.content).style.cssText = format("width:{0}px;height:{1}px;", w, h);	
		var clientWidth = Q.clientWidth(); 
		var clientHeight = Q.clientHeight(); 
		var left = Math.max(Math.floor(clientWidth / 2 - 300 / 2), 0);
		var top = Math.max(Math.floor(clientHeight / 2 - 200 / 2), 0);
		Q("#" + this.id).style.cssText = Q.format("left:{0}px;top:{1}px;width:300;height:200", left, top);
		this.autoCenter(w, h);
	},

	/**
	 * 弹出层自动居中显示
	 */
	autoCenter : function(w, h) {
		var box = Q("#" + this.id);
		var h = w || box.offsetHeight;
		var w = h || box.offsetWidth;
		var doc = document.body || document.documentElement;
		var clientWidth = Q.clientWidth(); 
		var clientHeight = Q.clientHeight(); 
		var left = Math.max(Math.floor(clientWidth / 2 - w / 2), 0);
		var top = Math.max(Math.floor(clientHeight / 2 - h / 2) + doc.scrollTop, 0);
		Q("#" + this.id).style.cssText = Q.format("left:{0}px;top:{1}px;", left, top);
	},

	/**
	 * 显示图片层
	 */
	showImage : function(url, options) {
		options = options || {};
	},

	/**
	 * 显示Ajax内容
	 * @param {String} url 需要ajax显示内容的url
	 * @param {Objext} options 
	 */
	showAjax : function(url, options) {
		options = options || {};
		var _this = this;
		this.showLoadingBox(options);
		Q.ajax(url, {
			/**
			 * 成功以后回调函数
			 */
			onSuccess: function(xhr) {
				var re = xhr.responseText;
				if (re) {
					if(Q.evalScripts) {
						Q.evalScripts(re);
					}
					re = Q.stripTags ? Q.stripTags(re, "script") : re;
					Q(_this.loadingTmp).innerHTML = re;
					_this.showContentBox(options);
					if(Q.evalScripts) {
						Q.evalScripts(re);
					}
				}
			},

			/**
			 * 请求失败回调函数
			 */
			onError: function() {
				alert("未知错误,请稍后重试！");
				_this.closeBox();
			}
		});
	},

	/**
	 * 显示Iframe内容
	 */
	showIframe : function(url, options) {            
		options = options || {};
	},

	/**
	 * 显示字符串内容
	 * @param {String} content 需要显示的字符串内容
	 * @param {Objext} options 
	 */
	showContent : function(content, options) {
		this.showLoadingBox(options);
		Q("#" + this.loadingTmp).innerHTML = content;
		this.showContentBox(options);
	}
};
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
