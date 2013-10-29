/**
 * ģ��ColorBox����һ������Q.js�ؼ�, ����ΪBox
 * @auther wangzhishou@qq.com
 * @date 2012-08-16
 * @See http://jacklmoore.com/colorbox for details.
 */

/**
 * ������
 * @name Q.Box 
 * @example  
   Q.Box(content, options)
 * @param {String || url} content ��Ҫչʾ���������ͣ����options.type�Ƿ�string���ͣ�����url�������ݡ�
 * @param {Object} options ѡ�����
 * @param {String} [options.id] ��ѡ������UI�ؼ�Ԫ�ص�id���ƣ�Ĭ����QBox
 * @param {String} [options.type] ��ѡ��������Ҫչ�ֵ��������ͣ�ajax��image��iframe��string��Ĭ����String
 * @param {Number} [options.width] ��ѡ���������������ȣ�Ĭ������������Ӧ��
 * @param {Number} [options.height] ��ѡ��������������߶ȣ�Ĭ������������Ӧ��
 * @param {String} [options.title] ��ѡ������������⣬Ĭ�����ޡ�
 * @param {String || function} [options.onClose] ��ѡ�������ر��Ժ�ص�����
 * @param {String || function} [options.onClick] ��ѡ����������Ժ�ص�����
 * @param {boolean} [options.isLoading] ��ѡ�������Ƿ���ʾloading����
 * @param {boolean} [options.isEffect] ��ѡ�������Ƿ��ж���Ч��
 * @param {boolean} [options.maskClick] ��ѡ���������������Ƿ����������رո���
 * @param {boolean} [options.buttons] ��ѡ�������Ƿ���ʾ��ť����������ť��������:
 * 	{
		"ȷ��" : {
			id : "QalertSubmit",
			class : "button green",
			callBack : {
				"click" : function() {
					box.closeBox();
				}
			}
		}
	��
 */
Q.Box = function(options) {
	this.options = options || {};
	this.enable  = true;
};

/**
 * ��Q.Box��������
 */
Q.Box.prototype = {
	/**
	 * ��ʾ����
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
	 * �Ƿ��ʼ��
	 */
	created : false,

	/**
	 * ҳ���е�UI��ʼ��
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
	 * �����������ݼ�����¼�
	 * @param {Object} options ����ѡ��
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
	 * ��̬�����ؼ�����HTML
	 */
	appendHTML : function(options) {
		var box = Q(this.id);
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
	 * ��Ԫ�ذ��¼�
	 */
	addBindings : function(options) {
		var box = Q(this.id);
		var self = this;
		if (box) {
			if (!this.inited) {
				var closeBtn = Q(this.closeBtn);
				Q.on(closeBtn, "click", this.closeBoxHandle(options));


				if (options.maskClick) {
					var overlay = Q(this.overlay);
					Q.on(overlay, "click", this.closeBoxHandle(options));
				}
				
				var content = Q(this.content);
				Q.on(content, "click", function(e){
					Q.call(options.onclick);				
				});
			}
		}
	},

	/**
	 * �رո�����
	 */
	closeBox : function(options) {
		var box = Q(this.id);
		if (box) {
			Q.hide(this.overlay, this.id);
			if (options && options.onclose) {
				var callBack = options.onclose;
				Q.call(callBack);
			}
		}
	},

	/**
	 * �¼������Ĺرո���
	 */
	closeBoxHandle : function(options) {
		var _this = this;
		return function(e) {
			_this.closeBox(options);
		};
	},

	/**
	 * ���ٴ�
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
	 * ������ʽ
	 */
	resetStyle : function() {

	},

	/**
	 * ��ȡ�Ѽ�����������Ŀ�Ⱥ͸߶�
	 */
	getLoadedContentOffset : function(options) {
		var tmp        = {};
		var loadingTmp = Q(this.loadingTmp);	
		tmp.w          = parseInt(options.width || loadingTmp.offsetWidth);
		tmp.h          = parseInt(options.height || loadingTmp.offsetHeight);	
		return tmp;
	},

	/**
	 * ��ȡ��������ĸ߶ȺͿ��
	 */
	getContentOffset : function(options) {
		var tmp           = {};
		tmp.w             = 0;
		tmp.h             = 0;
		var content       = Q(this.content);
		var loadedContent = Q(this.loadedContent);
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
	 * ��ʾ�������ݵ�״̬
	 */
	setContentStyle : function(options) {
		var content                 = Q(this.content);
		var loadedContent           = Q(this.loadedContent);
		var loadingTmp              = Q(this.loadingTmp);
		var title 					= Q(this.title);
		content.style.cssText       = "";
		loadedContent.innerHTML     = loadingTmp.innerHTML;
		Q.show(this.overlay, this.id);
		Q.hide(this.loadingGraphic, this.loadingOverlay);
		Q.show(this.title);
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
	 * ��ʾ����
	 */
	showContentBox : function(options) {
		var self                = this;
		var loadingTmp          = Q(this.loadingTmp);
		var content             = Q(this.content);
		var loadedContent       = Q(this.loadedContent);
		var loadingGraphic      = Q(this.loadingGraphic);
		var loadingOverlay      = Q(this.loadingOverlay);
		var title               = this.title;
		var overlay             = Q(this.overlay);
		var id                  = Q(this.id);
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
			Q.tween(this.id,{left:left,top:top,width:offsetW, height:offsetH}, {duration:500, onComplete:onComplete, onTween:onTween});
		} else {
			onComplete();
			self.autoCenter(offsetW, offsetH);
		}
	},

	/**
	 * ��ʾloading����
	 */
	showLoadingBox : function(options) {
		Q.hide(this.title, this.current, this.next, this.previous, this.slideshow);
		if (!options.isLoading) {
			return false;
		}
		var w = this.width;
		var h = this.height;
		var format = Q.format;
		var loadedContent = Q(this.loadedContent);
		loadedContent.style.cssText = "width: 0px; height: 0px; overflow: hidden;";
		Q.show(this.overlay, this.id, this.loadingGraphic, this.loadingOverlay);
		if (options.showClose) {
			Q.show(this.closeBtn);
		}
		Q(this.content).style.cssText = format("width:{0}px;height:{1}px;", w, h);	
		var clientWidth = Q.clientWidth(); 
		var clientHeight = Q.clientHeight(); 
		var left = Math.max(Math.floor(clientWidth / 2 - 300 / 2), 0);
		var top = Math.max(Math.floor(clientHeight / 2 - 200 / 2), 0);
		Q(this.id).style.cssText = Q.format("left:{0}px;top:{1}px;width:300;height:200", left, top);
		this.autoCenter(w, h);
	},

	/**
	 * �������Զ�������ʾ
	 */
	autoCenter : function(w, h) {
		var box = Q(this.id);
		var h = w || box.offsetHeight;
		var w = h || box.offsetWidth;
		var doc = document.body || document.documentElement;
		var clientWidth = Q.clientWidth(); 
		var clientHeight = Q.clientHeight(); 
		var left = Math.max(Math.floor(clientWidth / 2 - w / 2), 0);
		var top = Math.max(Math.floor(clientHeight / 2 - h / 2) + doc.scrollTop, 0);
		Q(this.id).style.cssText = Q.format("left:{0}px;top:{1}px;", left, top);
	},

	/**
	 * ��ʾͼƬ��
	 */
	showImage : function(url, options) {
		options = options || {};
	},

	/**
	 * ��ʾAjax����
	 * @param {String} url ��Ҫajax��ʾ���ݵ�url
	 * @param {Objext} options 
	 */
	showAjax : function(url, options) {
		options = options || {};
		var _this = this;
		this.showLoadingBox(options);
		Q.ajax(url, {
			/**
			 * �ɹ��Ժ�ص�����
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
			 * ����ʧ�ܻص�����
			 */
			onError: function() {
				alert("δ֪����,���Ժ����ԣ�");
				_this.closeBox();
			}
		});
	},

	/**
	 * ��ʾIframe����
	 */
	showIframe : function(url, options) {            
		options = options || {};
	},

	/**
	 * ��ʾ�ַ�������
	 * @param {String} content ��Ҫ��ʾ���ַ�������
	 * @param {Objext} options 
	 */
	showContent : function(content, options) {
		this.showLoadingBox(options);
		Q(this.loadingTmp).innerHTML = content;
		this.showContentBox(options);
	}
};