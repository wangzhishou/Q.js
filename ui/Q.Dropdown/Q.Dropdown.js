/**
 * �����˵�UI��
 * @auther wangzhishou@qq.com
 * @param {String || HtmlElement} id �˵�����id
 * @param {Boolean} [options.fade] �Ƿ��н������ֵĶ���Ч��
 * @param {Boolean} [options.slide] �Ƿ��лõ�ƬЧ��
 * @param {String} [options.active] ��ǰ�˵�������ʽ
 * @param {Number} [options.speed] ���������ٶ�
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
	 * �Ƿ��н���Ķ���
	 */
	fade:1,

	/**
	 * �Ƿ��лõ�ƬЧ��
	 */
	slide:1,

	/**
	 * ��ǰ�������ʽ
	 */
	active : 0,

	/**
	 * ��������ʱ��
	 */
	timeout : 200,

	/**
	 * ����㼶
	 */
	zIndex : 1000,

	/**
	 * ����
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
	 * ��ʾ�˵�
	 * @param {Number} index ��Ҫ��ʾ�Ĳ˵�����
	 * @param {Boolean} flag �Ƿ���ʾ
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
	 * �ر����в˵�
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
	 * ���ز˵�
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
	 * �����˵�
	 * @param {HtmlElement} ul ��Ҫ����չ����HTMLԪ��
	 * @param {Number} ul ������ƫ����	 
	 * @param {Boolean} isDown չ����������
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