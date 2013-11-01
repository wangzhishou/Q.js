/**
 * ComboBox类
 * @auther wangzhishou@qq.com
 * @description 模拟Select函数
 * @param {Object || String} id Select框ID
 * @param {Function} onchange 选择事件触发回调函数
 */
Q.ComboBox = function (params) {
    this.uniqueId    =   'id' + (new Date()).getTime();	
	this.selectId    =   params.id;
	this.onchange    =   params.onchange || function(){};
	this.listState   =   false;
	this.w;
	
    this.bodyId      =   this.uniqueId + 'ComboBox';
    this.textId      =   this.bodyId + 'Text';
    this.valueId     =   this.bodyId + 'Value';
    this.iconId      =   this.bodyId + 'Icon';
    this.listId      =   this.bodyId + 'List';
    this.itemsId     =   this.bodyId + 'Items';
	
    this.bodyClass   =   'combobox';
    this.iconClass   =   'comboboxIcon';
    this.textClass   =   'comboboxInput';
    this.listClass   =   'comboboxList';
    this.itemsClass  =   'comboboxItems';
    this.activeClass =   'comboboxItemActive';
    if(this.selectId) {
		this.init();
	}
}

Q.ComboBox.prototype = {	
	/**
	 * 初始化
	 */
	init : function () {
		this.creatElements();
		this.creatList();
		var icon = Q("#" +this.iconId);
		Q.on(icon, 'click', this.getIconClickHandler());
		Q.on(document, 'click', this.clickHandle());		
		Q("#" +this.textId).style.width = (this.w - icon.offsetWidth) + "px";
	},
	
	/**
	 * 创建Dom元素
	 */
	creatElements : function() {
		var selector = Q("#" +this.selectId);
		this.w = selector.offsetWidth;
		selector.style.display="none";
		var ComboBox = document.createElement("div");
		ComboBox.id = this.bodyId;
		ComboBox.className = this.bodyClass;
		ComboBox.style.width = this.w + "px";
		selector.parentNode.appendChild(ComboBox);
		
		var ComboBoxText = document.createElement("div");
		ComboBoxText.id = this.textId;		
		ComboBoxText.className = this.textClass;		
		ComboBox.appendChild(ComboBoxText);
		
		var ComboBoxIcon = document.createElement("div");		
		ComboBoxIcon.id = this.iconId;		
		ComboBoxIcon.className = this.iconClass;		
		ComboBox.appendChild(ComboBoxIcon);
		ComboBoxIcon.innerHTML = "&nbsp;";	
		
		var selectValue = selector.options[selector.selectedIndex].innerHTML;
		ComboBoxText.innerHTML = selectValue;		
		Q("#" +this.bodyId).title = selectValue;	
	},
	
	/**
	 * 创建模拟菜单
	 */		
	creatList : function () {
		var selector = Q("#" +this.selectId);	
		var list = document.createElement("div");
		list.id  = this.listId;
		list.style.width = this.w + "px";
		list.className = this.listClass;		
		this.listState = false;
		selector.parentNode.appendChild(list);
		this.updateData();
	},
	
	/**
	 * 更新数据
	 */
	updateData : function() {
		var selector = Q("#" +this.selectId);
		var list = Q("#" +this.listId);
		if(list) {
			list.innerHTML = "";
			var opt = selector.options;
			var frag = document.createDocumentFragment(); 
			for (var i = 0, n = opt.length; i < n; i++) {
				var optionTemp = opt[i];
				var items = document.createElement("div");
				items.id          = this.itemsId + i;
				items.className   = this.itemsClass;
				items.rel         = optionTemp.value;
				items.label       = optionTemp.label;
				items.title       = optionTemp.innerHTML;
				items.innerHTML   = optionTemp.innerHTML;
				items.onmouseover = this.setItemStyle();
				items.onmouseout  = this.resetItemStyle();
				items.onclick     = this.getItemClickHandler();
				frag.appendChild(items);
			}
			list.appendChild(frag); 
		}		
	},
	
	/**
	 * 模拟Select框点击后触发事件处理函数
	 * @private
	 */	
	clickHandle : function () {
		var me = this;
		return function (e) {
            e = Q.getEvent(e);
            var tar = Q.getTarget(e);
            if (tar.id != me.iconId) {
                Q("#" +me.listId).style.display = "none";
                me.listState = false;
            }
		};
	},
	
    /**
     * 获取下拉按键点击的事件句柄
     * 
     * @private
     * @return {Function} 下拉按键点击的事件句柄
     */
    getIconClickHandler: function () {
        var me = this;
        return function (e) {
            var listEl = Q("#" +me.listId);
            if (!me.listState) {
                listEl.style.display = "block";
				var listElDiv = listEl.getElementsByTagName('div');	
                var l = listElDiv.length;			
		    	var selector = Q("#" +me.selectId);	
                var containerEl = Q("#" +me.bodyId);
                var val = selector.options[selector.selectedIndex].innerHTML;
                while (l--) {
					var temp = Q("#" +listElDiv[l]);
                    if (val == Q.trim(temp.innerHTML)) {
                        me.selectItem = temp.id;
                        Q.addClass(me.selectItem, me.activeClass);
                        break;
                    }
                }
                me.listState = true;
            } else {
                listEl.style.display = "none";
                me.listState = false;
            }
        };
    },
	
	/**
	 * 鼠标移动上显示样式
	 *
	 * @private
     * @return {Function} 鼠标移上事件句柄
	 */		
	setItemStyle : function () {
		var me = this;
		return function () {			
            if (me.selectItem) {
            	 Q.removeClass(me.selectItem, me.activeClass);
				 me.selectItem = null;
            }
            Q.addClass(this, me.activeClass);
		};		
	},
	
	/**
	 * 鼠标移动去显示样式
	 *
	 * @private
     * @return {Function} 鼠标移去事件句柄
	 */			
	resetItemStyle : function () {
		var me = this;
		return function () {
       	 	Q.removeClass(this, me.activeClass);
		};	
		
	},
	
	/**
	 * 鼠标点击事件句柄
	 *
	 * @private
	 * @return {Function} 鼠标事件点击时间句柄
	 */	
	getItemClickHandler : function () {
		var me = this;
		return function () {
		   var value = this.rel;
           var text = this.title;
           var label = this.label;
           Q.addClass(this, me.activeClass);
		   me.setSelectValue(text);
           me.onchange.call(me, {'text': text, 'value': value, 'label': label});
		};		
	},
	
	/**
	 * 设置Select 框值
	 *
	 * @private
	 */		
	setSelectValue : function (text) {
		var obj = Q("#" +this.selectId);
		var opt = obj.options;
		var input = Q("#" +this.textId);
		input.innerHTML = text;
		input.title = text;
		for ( var i = 0, n = opt.length; i < n; i++) {
			if (opt[i].innerHTML == text) {
				obj.selectedIndex = i;
			}			
		}
	}
	
};