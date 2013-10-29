/**
 * 下拉菜单UI类
 * @auther wangzhishou@qq.com
 * @param {String || HtmlElement} id 菜单所在id
 * @param {Boolean} [options.fade] 是否有渐隐渐现的动画效果
 * @param {Boolean} [options.slide] 是否有幻灯片效果
 * @param {String} [options.active] 当前菜单激活样式
 * @param {Number} [options.speed] 动画播放速度
 */
Q.Dropdown = function(id, options) {
	for (i in options) {
		this[i] = options[i]
	} 
	if (id) {
		this.id = id;
		this.build();
	}
};

Q.Dropdown.prototype = {
	/**
	 * 是否有渐变的动画
	 */
	fade:1,

	/**
	 * 是否有幻灯片效果
	 */
	slide:1,

	/**
	 * 当前激活的样式
	 */
	active : 0,

	/**
	 * 动画持续时间
	 */
	timeout : 200,

	/**
	 * 浮层层级
	 */
	zIndex : 1000,

	/**
	 * 构建
	 */
	build : function() {
		this.liList = []; 
		this.ulList = []; 
		var element = Q(this.id);
		var ulList  = element.getElementsByTagName("ul"), l = ulList.length, i = 0; 
		this.speed  = this.speed ? this.speed*.1 : .5;
		for (i; i<l; i++) {
			var li = ulList[i].parentNode; 
			this.liList[i] = li;  
			this.ulList[i] = ulList[i];
			Q.on(li, "mouseover", this.show(i, 1));
			Q.on(li, "mouseout", this.show(i));
			var a = Q.tag('a', element), al = a.length, c = 0;
			for (c; c<al; c++) {
				Q.on(a[c], "click", this.collapse());
			}
		}
	},

	/**
	 * 显示菜单
	 * @param {Number} index 需要显示的菜单索引
	 * @param {Boolean} flag 是否显示
	 */
	show : function(index, flag) {
		var _this = this;
		return function() {
			var li = _this.liList[index], ul = _this.ulList[index];
			clearInterval(ul.hideTimer); 
			clearInterval(ul.showTimer);  			               
			ul.style.overflow = 'hidden';
			if(flag){
				if (_this.active && !Q.hasClass(li, _this.active)) {
					Q.addClass(li, _this.active);
				}
				if (_this.fade || _this.slide) {
					ul.style.display='block';
					if (!ul.offset) {
						if(_this.slide){
							ul.style.visibility ='hidden'; 
							ul.offset                = ul.offsetHeight; 
							ul.style.height     ='0'; 
							ul.style.visibility ='';
						} else {
							ul.offset             = 100; 
							ul.style.opacity = 0; 
							ul.style.filter  = 'alpha(opacity=0)';
						}
						ul.current = 0;
					}
					if (_this.slide) {
						if (ul.offset == ul.current) {
							ul.style.overflow = 'visible'
						} else {
							ul.style.zIndex = _this.zIndex; 
							_this.zIndex++; 
							ul.showTimer = setInterval(function(){
								_this.slide(ul, ul.offset, 1);
							}, 20);
						} 
					} else {
						ul.style.zIndex = _this.zIndex; 
						_this.zIndex++; 
						ul.showTimer = setInterval(function(){
							_this.slide(ul, ul.offset, 1);
						}, 
						20);
					}
				} else {
					ul.style.zIndex  = _this.zIndex; 
					ul.style.display = 'block';
				}
			} else {
				ul.hideTimer = setTimeout(function(){
					_this.hide(ul, _this.fade || _this.slide ? 1 : 0, li, _this.active);
				}, _this.timeout);
			}
		};
	},

	/**
	 * 关闭所有菜单
	 */
	collapse : function() {
		return function() {
			var element = Q(_this.id);
			var ulList  = element.getElementsByTagName("ul"), l = ulList.length, i = 0;
			for (i; i<l; i++) {
				ulList[i].style.display='none';
			}
		};
	},

	/**
	 * 隐藏菜单
	 */
	hide : function (ul, flag, li, classStr) {
		var _this = this;
		if (classStr) {
			Q.removeClass(li, classStr);
		}
		if(flag){
			ul.showTimer = setInterval(function(){
				_this.slide(ul,0,-1)
			},20) 
		} else {
			ul.style.display ='none'   
		}
	},

	/**
	 * 滑动菜单
	 * @param {HtmlElement} ul 需要滑动展开的HTML元素
	 * @param {Number} ul 调整的偏移量	 
	 * @param {Boolean} isDown 展开或者收缩
	 */
	slide : function (ul, offset, isDown) {
		if (ul.current == offset) {
			clearInterval(ul.showTimer); ul.showTimer=0;
			if (isDown == 1) {
				if (this.fade) {
					ul.style.filter  = ''; 
					ul.style.opacity = 1;
				}
				ul.style.overflow = 'visible';
			}
		} else {
			ul.current = (offset - Math.floor(Math.abs(offset-ul.current) * this.speed) * isDown);
			if (this.slide) {
				ul.style.height = ul.current + 'px';
			}
			if (this.fade) {
				var o            = ul.current / ul.offset; 
				ul.style.opacity = o;
				ul.style.filter  = 'alpha(opacity='+(o*100)+')';
			}
		}
	}
};