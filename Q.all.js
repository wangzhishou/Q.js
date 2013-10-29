/**
 * 声明Q包, 并获取Dom对象的封装
 * @name Q
 * @namespace Q
 * @version 0.0.1
 * @description  Q，更少的字符，方便书写。
 * @param {string | HTMLElement} element 页面元素对象或元素对象的id
 * @return {Element} dom元素
 */
var Q = function(element) {
		if (!element) {
			return null;
		}
		if (element.constructor == String) {
			element = document.getElementById(element);
		}
		return element;
	};/**
 * 获取页面视觉区域高度
 * @name Q.clientHeight
 * @example Q.clientHeight()
 * @return {number} 页面视觉区域高度
 */
Q.clientHeight = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};/**
 * 隐藏目标元素
 * @name Q.hide
 * @example
   Q.hide(element)
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.hide = function() {
	for (var i = 0, n = arguments.length; i < n; i++) {
		Q(arguments[i]).style.display = "none";
	}
};/**
 * 获取或设置目标元素的属性值
 * @name Q.attr
 * @function
 * @grammar Q.attr(element, key[, value])
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取或设置的attribute键名
 * @param {string} value 要设置的attribute值
 *
 * @returns {string|null} 目标元素的attribute值，获取不到时返回null
 */
Q.attr = function(element, key, value) {
	element = Q(element);

	if ('style' == key) {
		if (value) {
			element.style.cssText = value;
			return element;
		} else {
			return element.style.cssText;
		}
	}
	key = Q._propFix[key] || key;
	if (value) {
		element.setAttribute(key, value);
		return element;
	} else {
		return element.getAttribute(key);
	}
};/**
 * 创建 Element 对象。
 * @author wangzhishou@qq.com
 * @name Q.tag
 * @example 
   Q.tag(tagName[, options])
 * @param {string} tagName 标签名称.
 * @param {Object} options 元素创建时拥有的属性，如style和className.
 * @return {HTMLElement} 创建的 Element 对象
 */
Q.tag = function(tagName, options) {
    var element = document.createElement(tagName),
        options = options || {};
    for (var key in options) {
        Q.attr(element, key, options[key]);
    }
    return element;
};/**
 * 寻找匹配的目标元素
 * @name Q.matchNode
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             prop 遍历的方向名称，取值为previousSibling,nextSibling
 * @return {HTMLElement} 搜索到的元素，如果没有找到，返回 null
 */
Q.matchNode = function(element, prop) {
	element = Q(element);
	while (element = element[prop]) {
		if (element.nodeType == 1) {
			return element;
		}
	}
	return null;
};/**
 * 获取目标元素的下一个兄弟元素节点
 * @name Q.next
 * @function
 * @example Q.next(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @returns {HTMLElement|null} 目标元素的下一个兄弟元素节点，查找不到时返回null
 */
Q.next = function (element) {
    return Q.matchNode(element, 'nextSibling');
};/**
 * 为元素添加className
 * @name Q.addClass
 * @example Q.addClass(element, classNames)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 要添加的className，允许同时添加多个class，中间使用空白符分隔 *
 * @return {HTMLElement} 目标元素
 */
Q.addClass = function(element, classNames) {
    element = Q(element);

    var classArray = classNames.split(/\s+/),
        result = element.className,
        oldClass = " " + result + " ",
        i = 0,
        l = classArray.length;

    for (; i < l; i++) {
        if (oldClass.indexOf(" " + classArray[i] + " ") < 0) {
            result += (result ? ' ' : '') + classArray[i];
        }
    }

    element.className = Q.trim(result);
    return element;
};/**
 * 获取页面视觉区域宽度
 * @name Q.clientWidth
 * @example Q.clientWidth()             
 * @return {number} 页面视觉区域宽度
 */
Q.clientWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};/**
 * 获取目标元素所属的document对象
 * @name Q.getDocument
 * @example 
 	baidu.dom.getDocument(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id             
 * @returns {HTMLDocument} 目标元素所属的document对象
 */
Q.getDocument = function(element) {
	element = Q(element);
	return element.nodeType == 9 ? element : element.ownerDocument || element.document;
};/**
 * 显示元素
 * @name Q.show
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.show = function() {
    for (var i = 0, n = arguments.length; i < n; i++) {
        Q(arguments[i]).style.display = "";
    }
};/**
 * 获取元素纵向滚动量
 * @name 
   Q.scrollTop
 * @example
   Q.scrollTop()
 * @param ｛String || HtmlElement｝[target] 元素对象，默认是document
 * @return {number} 获取纵向滚动量
 */
Q.scrollTop = function (target) {    
    if(!target) {
    	var d = document;
    	return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
    } else {
    	return target.scrollTop;
    }
};/**
 * 移除元素的className
 * @name Q.removeClass
 * @example Q.removeClass(element[, classNames])
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 可选参数，要移除的className，允许同时移除多个class，中间使用空白符分隔, 如果为空, 元素cLassName置为空
 * @return {HTMLElement} 目标元素
 */
Q.removeClass = function(element, classNames) {
    element = Q(element);
    var oldClass = element.className.split(/\s+/);
    var newClass = classNames.split(/\s+/);
    var len = oldClass.length;
    var n = newClass.length;
    for (var i = 0; i < n; i++) {
        while (len--) {
            if (oldClass[len] == newClass[i]) {
                oldClass.splice(len, 1);
                break;
            }
        }
    }
    element.className = oldClass.join(' ');
    return element;
};/**
 * 提供属性名称转换使用
 * ie6,7下class要转换成className
 */
Q._propFix = {
    'for': 'htmlFor',
    'class': 'className',
    'tabindex': 'tabIndex',
    'readonly': 'readOnly',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'colspan': 'colSpan',
    'rowspan': 'rowSpan',
    'valign': 'vAlign',
    'usemap': 'useMap',
    'frameborder': 'frameBorder',
    'maxlength': 'maxLength',
    'contenteditable': 'contentEditable'
};/**
 * 设置或读取目标元素的style样式值
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} property 要设置的样式属性名
 * @param {string} value 要设置的样式值
 * @remark 不常用的属性没有进行修正
 */
 Q.css = function (element, property, value) {
	 element = Q(element);
	 var toCamelCase = Q.toCamelCase;
	 var isSet = value ? true : false;
	 property = toCamelCase(property);
	 if (isSet) {
	 	if (Q.ie()) {            
	 		switch (property) {
                case 'opacity':
                    if ( element.style.filter ) {
                        element.style.filter = 'alpha(opacity=' + value * 100 + ')';
                        if (!element.currentStyle || !element.currentStyle.hasLayout) {
                            element.style.zoom = 1;
                        }
                    }
                    break;
                case 'float':
                    property = 'styleFloat';
                default:
                element.style[property] = value;
            }
	 	} else {
            if (property == 'float') {
                property = 'cssFloat';
            }
            element.style[property] = value;
	 	}
	 } else {
		if (document.defaultView && document.defaultView.getComputedStyle) {
		    var value = null;

		    if (property == 'float') {
		        property = 'cssFloat';
		    }

		    var computed = element.ownerDocument.defaultView.getComputedStyle(element, '');
		    if (computed) { // test computed before touching for safari
		        value = computed[property];
		    }
		    return element.style[property] || value;
		} else if (document.documentElement.currentStyle && Q.ie()) { // IE method
		        switch( property) {
		            case 'opacity' :// IE opacity uses filter
		                var val = 100;
		                try { // will error if no DXImageTransform
		                    val = element.filters['DXImageTransform.Microsoft.Alpha'].opacity;

		                } catch(e) {
		                    try { // make sure its in the document
		                        val = element.filters('alpha').opacity;
		                    } catch(e) {
		                    }
		                }
		                return val / 100;
		            case 'float': // fix reserved word
		                property = 'styleFloat'; // fall through
		            default:
		                // test currentStyle before touching
		                var value = element.currentStyle ? element.currentStyle[property] : null;
		                return ( element.style[property] || value );
		        }
		} else { // default to inline only
		    return element.style[property];
		}
	 }
 };/**
 * 通过自定义别名属性(非原生属性)获取元素
 * @name Q.alias
 * @example Q.alias(attribute[, context, tagName])
 * @param {String} attribute 元素的自定义别名属性。
 * @param {HTMLElement} context 开始搜索查找的上下文，默认是document。
 * @param {String|HTMLElement} [tagName] 指定回去元素的标签名称，默认是所有标签。
 * @remark
 *
 *  不保证返回数组中DOM节点的顺序和文档中DOM节点的顺序一致。
 *
 * @return {Array} 获取的元素集合，查找不到或attribute参数错误时返回空数组.
 */
Q.alias = function(attribute, context, tagName) {
	var results = [];
	if (!context) {
		context = document;
	}
	if (!tagName) {
		tagName = '*';
	}
	var els = context.getElementsByTagName(tagName);
	var len = els.length;
	for (i = 0, j = 0; i < len; i++) {
		var el = els[i];
		var attr = Q.attr(el, attribute);
		if (attr) {
			results[j++] = el;
		}
	}
	return results;
};/**
 * 在目标元素的指定位置插入HTML代码
 *
 * @name Q.insertHTML
 * @param {HTMLElement | String} elem 指定的DOM节点
 * @param {String} where 指定的插入地点，目前支持四个点：beforeBegin afterBegin beforeEnd afterEnd
 * @param {String} html 需要被插入的HTML字符
 */
Q.insertHTML = function(elem, where, html) {
    elem = Q(elem);
    if (elem.insertAdjacentHTML) {
        elem.insertAdjacentHTML(where, html);
    } else if (typeof HTMLElement != "undefined" && !window.opera) {
        var e = elem.ownerDocument.createRange();
        e.setStartBefore(elem);
        e = e.createContextualFragment(html);

        switch (where.toLowerCase()) {
        case 'beforebegin':
            elem.parentNode.insertBefore(e, elem);
            break;
        case 'afterbegin':
            elem.insertBefore(e, elem.firstChild);
            break;
        case 'beforeend':
            elem.appendChild(e);
            break;
        case 'afterend':
            if (!elem.nextSibling) elem.parentNode.appendChild(e);
            else elem.parentNode.insertBefore(e, elem.nextSibling);
            break;
        }
    }
};/**
 * 获得元素的父节点
 * @name Q.parent
 * @function
 * @example Q.parent(element[, fun])
 * <pre>
 * <h4>获取元素指定标签的最近的祖先元素：</h4>
 * Q.parent(element, function(p) {
 * 		return (p.tagName == tagName) ? true : false;
 * });
 * <h4>获取目标元素指定元素className最近的祖先元素：</h4>
 * Q.parent(element, function(p) {
 * 		return Q.hasClass(p, "className");
 * });
 * </pre>
 * @param {HTMLElement|string} element   目标元素或目标元素的id 
 * @param {Function} fun 可选参数, 默认是null, 匹配自定义条件的函数, 返回匹配条件的Boolean值。
 * @returns {HTMLElement|null} 父元素，如果找不到父元素，返回null
 */
Q.parent = function(element, fun) {
	element = Q(element);
	fun = fun ? fun : function() {
		return true;
	};
	while ((element = element.parentNode) && element.nodeType == 1) {
		if (fun(element)) {
			return element;
		}
	}
	return null;
};/**
 * 删除目标元素
 * @name Q.remove
 * @example
   Q.remove(element)
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.remove = function() {
	var elm;
	for (var i = 0, n = arguments.length; i < n; i++) {
		elm = Q(arguments[i]);
		try {
			elm.parentNode.removeChild(elm);
		} catch (e) {}
	}
};/**
 * 通过className获取元素
 * @name Q.q
 * @grammar Q.q(className[, context, tagName])
 * @param {String} className 元素的class。
 * @param {HTMLElement} context 开始搜索查找的上下文，默认是document。
 * @param {String|HTMLElement} [tagName] 指定回去元素的标签名称，默认是所有标签。
 * @remark
 *
 *  不保证返回数组中DOM节点的顺序和文档中DOM节点的顺序一致。
 *
 * @returns {Array} 获取的元素集合，查找不到或className参数错误时返回空数组.
 */
Q.q = function(className, context, tagName) {
	var results = [];
	if (!context) {
		context = document;
	}
	if (!tagName) {
		tagName = '*';
	}
	var els = context.getElementsByTagName(tagName);
	var len = els.length;
	var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
	for (i = 0, j = 0; i < len; i++) {
		var el = els[i];
		if (pattern.test(el.className)) {
			results[j++] = el;
		}

	}
	return results;
};/**
 * 判断元素是否拥有指定的className
 * @name Q.hasClass
 * @function
 * @example Q.hasClass(element, classNames)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} classNames 要判断的className，可以是用空格拼接的多个className
 * @see Q.addClass, Q.removeClass
 *
 * @returns {Boolean} 是否拥有指定的className，如果要查询的classname有一个或多个不在元素的className中，返回false
 */
Q.hasClass = function(element, classNames) {

	element = Q(element);
	
	if (!element.nodeType === 1) {
		return false;
	}

	var classArray = Q.trim(classNames).split(/\s+/),
		len = classArray.length;

	className = element.className.split(/\s+/).join(" ");

	while (len--) {
		if (!(new RegExp("(^| )" + classArray[len] + "( |$)")).test(className)) {
			return false;
		}
	}
	return true;
};/**
 * 获取目标元素的computed style值。
 * @name Q.getComputedStyle
 * @example 
   Q.getComputedStyle(element, style)
 * @remark 
   如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} style 要获取的样式名             
 * @return {string} 目标元素的computed style值
 */
Q.getComputedStyle = function(element, style) {
    element = Q(element);
    var doc = Q.getDocument(element),
        styles;
    if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
            return styles[style] || styles.getPropertyValue(style);
        }
    }
    return '';
};/**
 * 阻止事件传播
 * @name Q.stopBubble
 * @function
 * @example Q.stopBubble(event)
 * @param {Event} event 事件对象
 */
Q.stopBubble = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};/**
 * 寻找匹配的目标元素
 * @name Q.matchNode
 * @param {HTMLElement|string} element   目标元素或目标元素的id
 * @param {string}             container 遍历的方向名称，取值为previousSibling,nextSibling
 * @return {HTMLElement} 搜索到的元素，如果没有找到，返回 null
 */
Q.matchNode = function(element, container) {
	element = Q(element);
	var node;
	while (node = element[container]) {
		if (node.nodeType == 1) {
			return node;
		}
	}
	return null;
};/**
 * 获取目标元素相对于整个文档左上角的位置
 * @name Q.getPosition
 * @example
   Q.getPosition(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id 
 * @remark 
   opera, gecko内核等浏览器bug没有修复         
 * @return {Object} 目标元素的位置，键值为top和left的Object。
 */
Q.getPosition = function(element) {
    element = Q(element);
    var doc = Q.getDocument(element),
        getStyle = Q.css,
        pos = {
            "left": 0,
            "top": 0
        },
        viewport = (Q.ie() && !Q.isStrict()) ? doc.body : doc.documentElement,
        parent, box;

    if (element == viewport) {
        return pos;
    }

    if (element.getBoundingClientRect) {
        box = element.getBoundingClientRect();

        pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
        pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);

        pos.left -= doc.documentElement.clientLeft;
        pos.top -= doc.documentElement.clientTop;

        var htmlDom = doc.body,
            htmlBorderLeftWidth = parseInt(getStyle(htmlDom, 'borderLeftWidth')),
            htmlBorderTopWidth = parseInt(getStyle(htmlDom, 'borderTopWidth'));
        if (Q.ie() && !Q.isStrict()) {
            pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
            pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
        }
    } else {
        parent = element;

        do {
            pos.left += parent.offsetLeft;
            pos.top += parent.offsetTop;
            if (Q.webkit() > 0 && getStyle(parent, 'position') == 'fixed') {
                pos.left += doc.body.scrollLeft;
                pos.top += doc.body.scrollTop;
                break;
            }

            parent = parent.offsetParent;
        } while (parent && parent != element);

        if (Q.opera() > 0 || (Q.webkit() > 0 && getStyle(element, 'position') == 'absolute')) {
            pos.top -= doc.body.offsetTop;
        }

        parent = element.offsetParent;
        while (parent && parent != doc.body) {
            pos.left -= parent.scrollLeft;
            parent = parent.offsetParent;
        }
    }

    return pos;
};/**
 * 使函数在页面dom节点加载完毕时调用
 * @author wangzhishou@qq.com
 * @name Q.domReady
 * @function
 * @example Q.domReady(callback)
 * @param {Function} callback 页面加载完毕时调用的函数.
 * @remark
 * 如果有条件将js放在页面最底部, 也能达到同样效果，不必使用该方法。
 * http://code.google.com/p/domready/downloads/detail?name=domready.js
 */
(function(){

    Q = Q || {};  

	var readyBound = false;	
	var isReady = false;
	var readyList = [];

	// Handle when the DOM is ready
	function domReady() {
		// Make sure that the DOM is not already loaded
		if(!isReady) {
			// Remember that the DOM is ready
			isReady = true;
        
	        if(readyList) {
	            for(var fn = 0; fn < readyList.length; fn++) {
	                readyList[fn].call(window, []);
	            }
            
	            readyList = [];
	        }
		}
	};

	// From Simon Willison. A safe way to fire onload w/o screwing up everyone else.
	function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
	    window.onload = func;
	  } else {
	    window.onload = function() {
	      if (oldonload) {
	        oldonload();
	      }
	      func();
	    }
	  }
	};

	// does the heavy work of working through the browsers idiosyncracies (let's call them that) to hook onload.
	function bindReady() {
		if(readyBound) {
		    return;
	    }
	
		readyBound = true;

		// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
		if (document.addEventListener && !Q.opera()) {
			// Use the handy event callback
			document.addEventListener("DOMContentLoaded", domReady, false);
		}

		// If IE is used and is not in a frame
		// Continually check to see if the document is ready
		if (Q.ie() && window == top) (function(){
			if (isReady) return;
			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch(error) {
				setTimeout(arguments.callee, 0);
				return;
			}
			// and execute any waiting functions
		    domReady();
		})();

		if(Q.opera()) {
			document.addEventListener( "DOMContentLoaded", function () {
				if (isReady) return;
				for (var i = 0; i < document.styleSheets.length; i++)
					if (document.styleSheets[i].disabled) {
						setTimeout( arguments.callee, 0 );
						return;
					}
				// and execute any waiting functions
	            domReady();
			}, false);
		}

		if(Q.safari()) {
		    var numStyles;
			(function(){
				if (isReady) return;
				if (document.readyState != "loaded" && document.readyState != "complete") {
					setTimeout( arguments.callee, 0 );
					return;
				}
				if (numStyles === undefined) {
	                var links = document.getElementsByTagName("link");
	                for (var i=0; i < links.length; i++) {
	                	if(links[i].getAttribute('rel') == 'stylesheet') {
	                	    numStyles++;
	                	}
	                }
	                var styles = document.getElementsByTagName("style");
	                numStyles += styles.length;
				}
				if (document.styleSheets.length != numStyles) {
					setTimeout( arguments.callee, 0 );
					return;
				}
			
				// and execute any waiting functions
				domReady();
			})();
		}

		// A fallback to window.onload, that will always work
	    addLoadEvent(domReady);
	};

	// This is the public function that people can use to hook up ready.
	Q.domReady = function(fn, args) {
		// Attach the listeners
		bindReady();
    
		// If the DOM is already ready
		if (isReady) {
			// Execute the function immediately
			fn.call(window, []);
	    } else {
			// Add the function to the wait list
	        readyList.push( function() { return fn.call(window, []); } );
	    }
	};
    
	bindReady();
	
})();/**
 * 获取事件的触发元素
 * @name Q.getTarget
 * @example
   Q.getTarget(event)
 * @param {Event} event 事件对象
 * @return {HTMLElement} 事件的触发元素
 */
Q.getTarget = function (event) {
    return event.target || event.srcElement;
};/**
 * 阻止事件的默认行为
 * @name Q.preventDefault
 * @example 
   Q.preventDefault(event)
 * @param {Event} event 事件对象
 * @event standard 标准事件模型
 */
Q.preventDefault = function(event) {
	if (event.preventDefault) {
		event.preventDefault();
	} else {
		event.returnValue = false;
	}
};/**
 * 阻止事件传播
 * @name Q.stopPropagation
 * @function
 * @example 
   Q.stopPropagation(event)
 * @param {Event} event 事件对象
 */
Q.stopPropagation = function (event) {
   if (event.stopPropagation) {
       event.stopPropagation();
   } else {
       event.cancelBubble = true;
   }
};/**
 * 为目标元素添加事件监听器
 * @name Q.on
 * @example 
   Q.on(element, type, listener)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要添加的监听器
 * @param {Boolean} [useCapture] 标准浏览器下事件的响应顺序
 * @remark 
	不支持跨浏览器的鼠标滚轮事件监听器添加
 */
Q.on = function(element, type, listener, useCapture) {
	type = type.replace(/^on/i, '');
	if (element.addEventListener) {
		useCapture = useCapture ? useCapture : false;
		element.addEventListener(type, listener, useCapture);
	} else if (element.attachEvent) {
		element.attachEvent('on' + type, function() {
			return listener.call(element, window.event);
		});
	}
}/**
 * 获取事件对象
 * @name Q.getEvent
 * @example
   Q.getEvent()
 * @return {Event} event对象.
 */
Q.getEvent = function() {
	if (window.event) {
		return window.event;
	} else {
		var f = arguments.callee;
		do {
			if (/Event/.test(f.arguments[0])) {
				return f.arguments[0];
			}
		} while (f = f.caller);
		return null;
	}
};/**
 * 为目标元素移除事件监听器
 * @name Q.un
 * @function
 * @example
   Q.un(element, type, listener)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要移除的监听器
 * @param {Boolean} [useCapture] 标准浏览器下事件的响应顺序            
 * @return {HTMLElement|window} 目标元素
 */
Q.un = function(element, type, listener, useCapture){
	type = type.replace(/^on/i, '').toLowerCase();
	if (element.removeEventListener) {
		useCapture = useCapture ? useCapture : false;
		element.removeEventListener(type, listener, useCapture);
	} else if (element.detachEvent) {
		element.detachEvent('on' + type, listener);
	}
}/**
 * 创建ajax请求，包含常用功能
 * @name Q.ajax
 * @param {String} url 要加载的数据的url
 * @param {String} [option.data] 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param {String | Object} [option.arguments] 请求响应后回调函数需要传递的参数
 * @param {Boolean} [option.async] 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 * @param {Boolean} [option.cache] 默认值: false, 设置为 false 将不缓存此页面。
 * @param {Function} [option.onSuccess] 请求成功后的回调函数。
 * @param {Function} [option.onError] 请求失败时调用此函数。如果发生了错误，错误信息（第二个参数）除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
 * @param {Function} [option.onComplete] 当请求完成之后调用这个函数，无论成功或失败。传入 XMLHttpRequest 对象，以及一个包含成功或错误代码的字符串。
 * @param {Function} [option.onTimeout] 请求超时后回调函数, 超时不会中断请求，根据返回的Ajax自行中断。
 * @param {Function} [option.on{status_number}] 当请求为相应状态码时触发的事件，如on302、on404、on500
 * @param {Function} [option.onBeforeSend] 发送请求之前触发。
 * @param {Number} [option.timeout] 超时时间，单位ms, 默认值：30000
 * @param {Object} 	[option.headers] 			要设置的请求 header
 * @param {String} [option.contentType] 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
 * @param {String} [option.method] 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
 * @param {String} [option.dataType] 预期服务器返回的数据类型，默认是Json。
 * @remark 
   由于不常用，去掉了用户名和密码验证功能。
 * @return {Object} ajax 返回一个ajax对象，可以abort掉
 */
Q.ajax = function(url, options) {
	var httpRequest, timeout, timer, key, eventHandlers = {},
		method = options.method || "GET",
		data = options.data || null,
		arguments = options.arguments || null,
		//async = options.async || true,
		async = ("async" in options)?options.async:true,
		timeout = options.timeout ? options.timeout : 30000,
		dataType = options.dataType || "json",
		cache = options.cache || false;

	var defaultHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		'X-Requested-With': 'XMLHttpRequest'
	};

	var headers = options.headers || {};
	for (key in headers) {
		if (headers.hasOwnProperty(key)) {
			defaultHeaders[key] = headers[key];
		}
	}

	url = url || "";
	method = method.toUpperCase();

	/**
	 * 获取XMLHttpRequest对象
	 *
	 * @return {XMLHttpRequest} XMLHttpRequest对象
	 */

	function getXMLHttpRequest() {
		if (window.ActiveXObject) {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {}
			}
		}
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
	}

	/**
	 * 触发事件
	 *
	 * @param {String} type 事件类型
	 */

	function callHandler(type) {
		var handler = eventHandlers[type];
		if (handler) {
			if (timer) {
				clearTimeout(timer);
			}

			if (type != 'onSuccess') {
				handler(httpRequest, arguments);
			} else {
				try {
					httpRequest.responseText;
				} catch (error) {
					return handler(httpRequest, arguments);
				}
				if (dataType.toLowerCase() === "script") {
					eval.call(window, httpRequest.responseText);
				}
				handler(httpRequest, arguments);
			}
		}
	}

	/**
	 * readyState发生变更时调用
	 */

	function stateChangeHandler() {
		if (httpRequest.readyState == 4) {
			try {
				var stat = httpRequest.status;
			} catch (ex) {
				callHandler('onError');
				return;
			}
			callHandler("on" + stat);
			if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
				callHandler('onSuccess');
			} else {
				callHandler('onError');
			}
			callHandler('onComplete');
			window.setTimeout(function() {
				httpRequest.onreadystatechange = function() {};
				if (async) {
					httpRequest = null;
				}
			}, 0);
		}
	}

	for (key in options) {
        eventHandlers[key] = options[key];
    }
	try {
		httpRequest = getXMLHttpRequest();
		if (data) {
			url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
			data = null;
		}
		if (!cache) {
			url += (url.indexOf('?') >= 0 ? '&' : '?') + 'q' + (+new Date) + '=Q';
		}
		httpRequest.open(method, url, async);
		if (async) {
			httpRequest.onreadystatechange = stateChangeHandler;
		}
		for (key in defaultHeaders) {
			if (defaultHeaders.hasOwnProperty(key)) {
				httpRequest.setRequestHeader(key, defaultHeaders[key]);
			}
		}
		callHandler('onBeforeSend');
		httpRequest.send(options.data);
		if (timeout) {
			timer = window.setTimeout(function() {
				callHandler("onTimeout");
			}, timeout);
		}
	} catch (ex) {
		callHandler('onError');
	}
	//返回一个ajax对象，可以abort掉
	return httpRequest;
};/**
 * 将一个表单用ajax方式提交
 * @name Q.ajaxForm
 * @example
   Q.ajaxForm(form[, options])
 * @param {HTMLFormElement} form  需要提交的表单元素
 * @param {Function} [option.encoder] 对表单的值进行转义或过滤。如：对字符串进行%#&+=以及和\s匹配的所有字符进行url转义
 * @param {String} [option.data] 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param {String | Object} [option.arguments] 请求响应后回调函数需要传递的参数
 * @param {Boolean} [option.async] 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
 * @param {Boolean} [option.cache] 默认值: false, 设置为 false 将不缓存此页面。
 * @param {Function} [option.onSuccess] 请求成功后的回调函数。
 * @param {Function} [option.onError] 请求失败时调用此函数。如果发生了错误，错误信息（第二个参数）除了得到 null 之外，还可能是 "timeout", "error", "notmodified" 和 "parsererror"。
 * @param {Function} [option.onComplete] 当请求完成之后调用这个函数，无论成功或失败。传入 XMLHttpRequest 对象，以及一个包含成功或错误代码的字符串。
 * @param {Function} [option.onTimeout] 请求超时后回调函数, 超时不会中断请求，根据返回的Ajax自行中断。
 * @param {Function} [option.on{status_number}] 当请求为相应状态码时触发的事件，如on302、on404、on500
 * @param {Function} [option.onBeforeSend] 发送请求之前触发。
 * @param {Number} [option.timeout] 超时时间，单位ms, 默认值：30000
 * @param {Object}  [option.headers]            要设置的请求 header
 * @param {String} [option.contentType] 默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型。
 * @param {String} [option.type] 默认值: "GET")。请求方式 ("POST" 或 "GET")， 默认为 "GET"。注意：其它 HTTP 请求方法，如 PUT 和 DELETE 也可以使用，但仅部分浏览器支持。
 * @param {String} [option.dataType] 预期服务器返回的数据类型，默认是Json。
 * @remark
   具体参数查看Q.ajax。          
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
Q.ajaxForm = function(form, options) {
    form = Q(form);
    var attr = Q.attr, 
        encoder = function(v) {
            return v;
        },
        tmpstr,
        method = attr(form, 'method'),
        url = attr(form, 'action'),
        params = {};

    options = options || {};
    encoder = options.encoder || encoder;

    // 复制发送参数选项对象
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            params[i] = options[i];
        }
    }

    // 完善发送请求的参数选项
    tmpstr        = (options.data ? "&" + options.data : "");
    params.data   = Q.serializeForm(form, encoder) + tmpstr;
    params.method = method;

    // 发送请求
    return Q.ajax(url, params);
};/**
 * 动态在页面上加载一个外部js文件
 * @name Q.loadJs
 * @example 
   Q.loadJs(params)
 * @param {string} params.src 必选参数，js文件路径
 * @param {string} [params.id] 可选参数，加载js的id
 * @param {Function} [params.callback] 可选参数，加载完成回调函数 
 * @param {Function} [params.isRemove] 可选参数，加载的js文件是否删除，默认是删除
 * @param {Function} [params.charset] 可选参数，指定字符集，默认是gb2312
 */
Q.loadJs = function(params) {
	params.id       = params.id || "LoadedJs" + new Date().getTime();
	params.isRemove = params.isRemove || true;
	var _script     = document.createElement("script");
	_script.id      = params.id;
	_script.type    = "text/javascript";
	_script.charset = params.charset || "gb2312";
	var callback    = function() {
		params.callback && params.callback();
		if (params.isRemove) {
			Q.remove(params.id);
		}
	};
	if (_script.readyState) { //IE
		_script.onreadystatechange = function() {
			if (_script.readyState == "loaded" || _script.readyState == "complete") {
				_script.onreadystatechange = null;
				callback();
			}
		};
	} else { //Others
		_script.onload = function() {
			callback();
		};
	}
	_script.src = params.src;
	var s = document.getElementsByTagName('script')[0]; 
	s.parentNode.insertBefore(_script, s);
};/**
 * 使用的Safari浏览器的版本号，如果是0表示不是此浏览器
 * @name Q.Safari
 * @description {Number} 用户使用的浏览器的版本号，如果是0表示不是此浏览器
 * @return {Number} 返回浏览器的版本号
 */
Q.safari = function() {
	return /version\/([\d.]+).*safari/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};/**
 * 判断是否为webkit内核
 * @name Q.webkit
 * @example
   Q.webkit
 * @return {Boolean} 布尔值
 */
Q.webkit = function() {
	return /webkit/i.test(Q._ua()) ? true : false;
};/**
 * 获取opera浏览器的版本号
 * @name Q.opera
 * @example
   Q.opera
 * @return {Number} opera浏览器的版本号，如果是0表示不是此浏览器
 */
Q.opera = function() {
	return /opera.([\d.]+)/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};/**
 * 获取Chrome浏览器的版本号
 * @name Q.chrome
 * @example
   Q.firefox
 * @return {Number} Chrome浏览器的版本号，如果是0表示不是此浏览器
 */
Q.chrome = function() {
	return /chrome\/([\d.]+)/.test(Q._ua()) ? +(RegExp['$1']) : 0;
};/**
 * 判断是否为ie浏览器
 * @name Q.ie
 * @remark
   IE > 8浏览器下，以documentMode为准
 * @example
   Q.ie
 * @return {Number} ie浏览器版本号,如果是0表示不是此浏览器
 */
Q.ie = function() {
	return /msie (\d+\.\d+)/i.test(Q._ua()) ? +RegExp['$1'] : 0;
};/**
 * 获取firefox浏览器版本号
 * @name Q.firefox
 * @example
   Q.firefox
 * @return {Number} firefox版本号，如果是0表示不是此浏览器
 */
Q.firefox = function() {
	return /firefox\/(\d+\.\d+)/i.test(Q._ua) ? + RegExp['$1'] : 0;
};/**
 * 获取浏览器的navigator.userAgent
 * @name Q._ua
 * @description 为了降低字节数，临时缓存一下
 * @return String
 */
Q._ua = function() {
	return navigator.userAgent.toLowerCase();
};/**
 * 判断浏览器的工作模式，Standards Mode和Quirks Mode
 * @name Q.isStrict
 * @description  document.compatMode它有两种可能的返回值：BackCompat和CSS1Compat
 * @return {Boolean} 布尔值 true --> Standards Mode  false --> Quirks Mode
 */
Q.isStrict = function() {
	return document.compatMode == "CSS1Compat" ? true : false;
};/**
 * 使用淡入效果来显示一个隐藏的元素。
 * @name  Q.fadeIn
 * @example
 * <pre>
 *   Q.fadeIn(document.getElementById("test"), 1000, fn);
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Number} duration 动画的持续时间长度,单位毫秒
 * @param {Number} callback 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
 Q.fadeIn = function(element, duration, callback) {
 	duration = duration || 2000;
 	callback = callback || function(){};
 	Q.show(element);
 	return Q.tween(element, {opacity:1}, {onComplete:callback, duration:duration})
 };/**
 * 使用淡出效果来隐藏一个元素：。
 * @name  Q.fadeOut
 * @example
 * <pre>
 *   Q.fadeOut(document.getElementById("test"), 1000, fn);
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Number} duration 动画的持续时间长度,单位毫秒
 * @param {Number} callback 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
 Q.fadeOut = function(element, duration, callback) {
 	duration = duration || 2000;
 	function onComplete() {
 		callback || callback();
 		Q.hide(element);
 	}
 	return Q.tween(element, {opacity:0}, {onComplete:callback, duration:duration})
 };/**
 * 基于style样式的渐变类
 * @name Q.tween
 * @example
 * <pre>
 *   Q.tween(document.getElementById("el1"), {left：20，top：40});
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Object} styleObject 需要改变元素的属性集合{left：20，top：40}
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {function} options.onComplete 动画结束后回调函数
 * @param {function} options.onTween 动画过程中回调，参数为变化率
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween = function(element, styleObject, options) {
    var _this         = Q.tween;
    element           = Q(element);
    options           = options || {};
    options.transform = options.transform || _this.transform;
    options.interval  = options.interval  || _this.interval;
    options.duration  = options.duration  || _this.duration;
    return _this.move(element, styleObject, options);
};

/**
 * 渐变的时间间隔,默认为20毫秒
 * @public
 */
Q.tween.interval = 20;

/**
 * 转换函数,默认为减减速运动
 * @public
 */
Q.tween.transform = function (x) {
    return 1 - Math.pow(1 - x, 3);
};

/**
 * 总时长(秒),默认为2000毫秒
 * @public
 */
Q.tween.duration = 2000;

/**
 * 开始渐变.
 * 渐变类的根据,所有渐变都是通过这个函数启动
 * @public
 * 
 * @param {Function} onTween 单步渐变的处理函数,该函数有传入参数x代表当前偏移量相对于总偏移量的比例
 * @param {Function} onComplete 渐变完成后回调函数
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {Number} options.onComplete 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween.start = function (onTween, onComplete, options) {
    var interval  = options.interval;
    var duration  = options.duration;
    var transform = options.transform;
    var end       = transform(1);
    var t         = 0;
    function callback() {
        t += interval;
        var x = t / duration;
        if (x >= 1) {
            onTween(1);
            onComplete && onComplete();
            clearInterval(task);
        } else {
            onTween(transform(x) / end);
        }
    }
    var task = setInterval(callback, interval);
    return task;
};

/**
 * 指定目标元素移动
 * @public
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Object} styleObject 需要改变元素的属性集合{left：20，top：40}
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {Number} options.onComplete 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween.move = function (element, styleObject, options) {
    element = Q(element);
    var originalCssText = element.style.cssText;
    var tempStyle       = {};
    for (var i in styleObject) {
        var oValue   = Q.css(element, i);
        var v        = parseFloat(oValue);
        tempStyle[i] = isNaN(v) ? 0 : v;
    }
    function onTween(rate) {
        var sArray = [];
        for (var i in styleObject) {
            var start = tempStyle[i];
            var end   = parseFloat(styleObject[i]);
            var val   = start + (end - start) * rate; 
            switch (i) {
                case "opacity":             
                    if (element.style.filter) {
                        sArray.push("filter:alpha(opacity=" + val * 100 + ");");
                        if (!element.currentStyle || !element.currentStyle.hasLayout) {
                            sArray.push("zoom:1");
                        }
                    } else {
                        sArray.push(i + ":" + val + ";");
                    }
                    break;
                default:
                    sArray.push(i + ":" + val + "px;");
                    break;
            }
        }
        element.style.cssText = originalCssText + ";" + sArray.join("");
        options.onTween && options.onTween(rate);
    }
    function onComplete() {
        options.onComplete && options.onComplete();
    }
    return this.start(onTween, onComplete, options);
};/**
 * 判断目标参数是否Array对象
 * @name Q.isArray
 * @example baidu.lang.isArray(source)
 * @param {Any} source 目标参数
 *             
 * @return {boolean} 类型判断结果
 */
Q.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};/**
 * 将源对象的所有属性拷贝到目标对象中
 * @author wangzhishou@qq.com
 * @name Q.extend
 * @function
 * @example 
   Q.extend(target, source)
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @remark
 * 
	1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
	2.源对象的prototype成员不会拷贝。            
 * @return {Object} 目标对象
 */
Q.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }    
    return target;
};/**
 * 调用函数, 不支持事件对象的传递
 * @param {Function || string} fnName 需要调用的函数 
 * @param {Object} [param] 可选参数，调用函数传递的参数
 */
Q.call = function(fnName, param) {
	param = param || {};
	if(Q.isFunction(fnName)) {
		fnName.call(null, param);
	}
	if(Q.isString(fnName)) {
		var fnlist = fnName.split(".");
		var n = fnlist.length, i = 0;
		var callee = window;
		while( i < n) {
		    var k = fnlist[i];
		    callee = callee[k];
		    i++;
		}
		callee.call(k, param);
	}
};/**
 * 判断对象是否是函数
 * @name Q.isUndefined
 * @auther wangzhishou@qq.com
 * @param  {Object} object 需要判断的对象
 * @return {Bolean} 布尔值
 */
Q.isUndefined = function(object) {
    return typeof object == "undefined";
};/**
 * 执行其中的的 JavaScript 代码
 * @name Q.evalScripts
 * @auther wangzhishou.com
 * @example 
   Q.evalScripts(str);
 * @param {String} str 函数可执行其中的的 JavaScript 代码。
 * @remark
   window.execScript() 所执行后的脚本上文是针对整个全局域的
   window.eval 方法，在 IE6 IE7 IE8 中依然在脚本所在上下文中执行
 */
Q.evalScripts = function(str) {
	var resultAll = Q.extractTags(str, "script");
    Q.each(resultAll, function(key, val) {
		if(window.execScript) {
			window.execScript(val);
		} else {
			window.eval(val);		
		}
    });
};/**
 * 遍历对象中所有元素
 * @name Q.each
 * @auther wangzhishou@qq.com
 * @example Q.each(source, iterator)
 * @param {Object} source 需要遍历的对象
 * @param {Function} callback 对每个对象元素进行调用的函数，function (key, value)
 *             
 * @return {Object} 遍历的Object
 */
Q.each = function( object, callback) {
	var name, i = 0,
		length = object.length,
		isObj = length === undefined || Q.isFunction( object );

	if ( isObj ) {
		for ( name in object ) {
			if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
				break;
			}
		}
	} else {
		for ( ; i < length; ) {
			if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
				break;
			}
		}
	}
	return object;
};/**
 * 判断对象是否是函数
 * @name Q.isFunction
 * @auther wangzhishou@qq.com
 * @param  {Object} object 需要判断的对象
 * @return {Bolean} 布尔值
 */
Q.isFunction = function(object) {
    return typeof object == "function";
};/**
 * 判断对象是否是字符串
 * @name Q.isString
 * @auther wangzhishou@qq.com
 * @param  {Object} object 需要判断的对象
 * @return {Bolean} 布尔值
 */
Q.isString = function(object) {
    return typeof object == "string";
};/**
 * 判断对象是否是函数
 * @name Q.isNumber
 * @auther wangzhishou@qq.com
 * @param  {Object} object 需要判断的对象
 * @return {Bolean} 布尔值
 */
Q.isNumber = function(object) {
    return typeof object == "number";
};/**
 * 根据参数名从目标URL中获取参数值
 * @name Q.getQuery
 * @example Q.getQuery(url, key)
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 *             
 * @returns {string|null} - 获取的参数值，获取不到时返回null
 */
Q.getQuery = function (url, key) {
    var reg = new RegExp("(^|&|\\?|#)" + key + "=([^&#]*)(&|$|#)", "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }    
    return null;
};/**
 * 对目标字符串进行html解码
 * @name 
   Q.decodeHTML
 * @example
   Q.decodeHTML(str)
 * @param {string} str 目标字符串 *             
 * @return {string} html解码后的字符串
 */
Q.decodeHTML = function (str) {
    var str = String(str)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
    return str.replace(/&#([\d]+);/g, function(a, b){
        return String.fromCharCode(parseInt(b, 10));
    });
};/**
 * 对目标字符串进行格式化
 * @name Q.format
 * @function
 * @example
   Q.format(str, opts)
 * @param {string} str 目标字符串
 * @param {Object|string...} opts 提供相应数据的对象或多个字符串
 * @remark
 * 
	opts参数为“Object”时，替换目标字符串中的{property name}部分。<br>
	opts为“string...”时，替换目标字符串中的{0}、#{1}...部分。
		
 *             
 * @return {string} 格式化后的字符串
 */
Q.format = function (str, opts) {
    str = String(str);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return str.replace(/\{(.+?)\}/g, function (match, key){
	    	var replacer = data[key];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(key);
	    	}
	    	return ('undefined' == typeof replacer ? '' : replacer);
    	});
    }
    return str;
};/**
 * 采用正则解析HTML标签内容
 * @name Q.extractTags
 * @auther wangzhishou.com
 * @example 
   Q.extractTags(str, "a");
 * @param {String} str 需要解析的源字符串内容
 * @param {String} [tagName] 可选参数, 需要过滤的html标签名称
 * @return {Array} 返回全局解析后的结果集
 */
Q.extractTags = function(str, tagName) {
	var fragment  = '(?:<' + tagName + '.*?>)((\n|\r|.)*?)(?:<\/' + tagName + '>)';
	var matchAll  = new RegExp(fragment, 'img');
	var matchOne  = new RegExp(fragment, 'im');
	var resultAll = str.match(matchAll) || [];
    Q.each(resultAll, function(key, val) {
		resultAll[key] = (val.match(matchOne) || ['', ''])[1];
    });
    return resultAll;
};/**
 * 对目标字符串进行Unicode编码
 * @name Q.toUnicode
 * @example
   Q.toUnicode(source)
 * @param {string} source 目标字符串            
 * @return {string} 编码后的字符串
 */
Q.toUnicode = function(source) {
  var str = "";
  for (i = 0, n = source.length; i < n; i++) {
    temp = source.charCodeAt(i).toString(16).toUpperCase();
    str += "\\u" + new Array(5 - String(temp).length).join("0") + temp;
  }
  return str;
};/**
 * 对Unicode编码进行解码
 * @name Q.unUnicode
 * @example
   Q.unUnicode(source)
 * @param {string} source 已编码的目标字符串            
 * @return {string} 解码后的字符串
 */
Q.unUnicode = function(source) {
  return eval(source.toUpperCase().replace("\\", "\\\\"));
};/**
 * 删除目标字符串两端的空白字符
 * @name Q.trim
 * @function
 * @grammar Q.trim(str)
 * @param {string} str 目标字符串
 * @remark
 * 不支持删除单侧空白字符
 *
 * @returns {string} 删除两端空白字符后的字符串
 */
Q.trim = function(str) {
	var pattern = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
	return String(str).replace(pattern, '');
}/**
 * 解析字url符串成json对象
 * @name Q.urlToJson
 * @example Q.urlToJson(url)
 * @param {string} url 目标字符串
 *
 * @return {Object} - 解析为结果对象，相同字符串被解析成数组。
 */
Q.urlToJson = function(url) {
    var query = url.substr(url.lastIndexOf('?') + 1),
        params = query.split('&'),
        len = params.length,
        result = {},
        i = 0,
        key, value, item, param;

    for (; i < len; i++) {
        if (!params[i]) {
            continue;
        }
        param = params[i].split('=');
        key = param[0];
        value = param[1];

        item = result[key];
        if ('undefined' == typeof item) {
            result[key] = value;
        } else if (Q.isArray(item)) {
            item.push(value);
        } else {
            result[key] = [item, value];
        }
    }
    return result;
};/**
 * 采用正则去除字符串中的HTML标签内容
 * @name Q.stripTags
 * @example
   Q.stripTags(str); 
   Q.stripTags(str, "a");
 * @param {String} str 需要去除的源字符串内容
 * @param {String} [tagName] 可选参数, 需要过滤的html标签名称
 * @remark
   当指定标签名称的时候，会过滤调标签里的内容
 * @auther wangzhishou.com
 */
Q.stripTags = function(str, tagName) {
	tagName = tagName || null;
	if (!tagName) {		
		var re = new RegExp('<\/?[^>]+>', 'ig');
		return str.replace(re, '');
	} else {
		var re = new RegExp('(?:<' + tagName + '.*?>)((\n|\r|.)*?)(?:<\/' + tagName + '>)', 'img');
		return str.replace(re, '');
	}
};/**
 * 截取字符串
 */
function subString(str, len) {
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      strlen += 2;
    } else {
      strlen++;
    }
    s += str.charAt(i);
    if (strlen >= len) {
      return s;
    }
  }
  return s;
}/**
 * 将目标字符串进行驼峰化处理
 * @name Q.toCamelCase
 * @example 
   Q.toCamelCase("font-size"); 
 * @param {string} source 目标字符串
 * @remark
 * 支持单词以“-_”分隔             
 * @returns {string} 驼峰化处理后的字符串
 */
Q.toCamelCase = function(source) {
	if (source.indexOf('-') < 0) {
		return source;
	}
	return source.replace(/[-][^-]/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
};/**
 * 对目标字符串进行html编码
 * @name Q.encodeHTML
 * @example
   Q.encodeHTML(str)
 * @param {string} str 目标字符串
 * @remark
 * 编码字符有5个：&<>"'
 *             
 * @return {string} html编码后的字符串
 */
Q.encodeHTML = function(str) {
	return String(str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
};/**
 * 序列化Form表单
 * @name Q.serializeForm
 * @auther wangzhishou.com
 * @example 
   Q.serializeForm(form, encodeURIComponent);
 * @param {String} str 需要序列化的Form表单id
 * @param {Function} [encoder] 可选参数, 需要对序列化的内容进行编码
 * @return {String} 返回序列化后的结果，格式为：a=1&b
 * @remark
 * 当字段为
 */
Q.serializeForm = function (form, encoder) {
	form = Q(form);
	if (!form || form.nodeName !== "FORM") {
		return;
	}
	encoder = encoder || function(v) {
		return v;
	}
	var elements = form.elements;
	var i, j, opts, o, q = [], len = elements.length;

	/**
     * 收集参数数据
     */
    function a(name, value) {
        q.push(name + '=' + encoder(value));
    };

	for (i = 0; i < len; i++) {
		var item = form.elements[i];		
        itemName = Q.trim(item.name);
        itemType = item.type;
        itemValue = item.value;
		if (itemName === "" && item.disabled) {
			break;
		}
		switch (itemType) {         
			case 'file':
				break;			
            case 'radio':
            case 'checkbox':
                if (!item.checked) {
                    break;
                }       
			case 'text':
			case 'hidden':
			case 'password':
			case 'button':
            case 'textarea':
            case 'select-one':
				a(itemName, itemValue);
				break;
			case 'select-multiple':
                opts = item.options;
                oLen = opts.length;
                for (j = 0; j < oLen; j++) {
                	o = opts[j];
					if (o.selected) {
						a(itemName, o.value);
					}
				}
				break;
		}
	}
	return q.join("&");
};/**
 * 设置cookie
 * @name Q.setCookie
 * @example 
   Q.setCookie(name, value[, options])
 * @params {string} name 需要设置Cookie的键名
 * @params {string} value 需要设置Cookie的值
 * @params {string} [path] cookie路径
 * @params {Date} [expires] cookie过期时间
 * @params {string} [domain] cookie域名
 * @params {string} [secure] cookie是否安全传输
 * @remark
 * 清除cookie，设置expires= new Date(00-00-1970) Fri, 02-Jan-1970 00:00:00 GMT
 */
Q.setCookie = function(name, value, options) {
	options = options || {};
	var expires = options.expires || null;
	var path = options.path || "/";
	var domain = options.domain || document.domain;
	var secure = options.secure || null;
	document.cookie = name + "=" + escape(value) 
	+ ((expires) ? "; expires=" + expires.toGMTString() : "") 
	+ "; path=" + path
	+ "; domain=" + domain 
	+ ((secure) ? "; secure" : "");
};/**
 * 获取cookie的值
 * @name Q.getCookie
 * @example 
   Q.getCookie(name)
 * @param {string} name 需要获取Cookie的键名
 * @return {string|null} 获取的Cookie值，获取不到时返回null
 */
Q.getCookie = function(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name
			+ "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(arr[2]);
	}
	return null;
};/**
 * 将javacript对象转化成url参数字符串
 * @name Q.param
 * @example
   Q.param(obj)
 * @param {Object || Array ||} obj 需要解析的javacript对象  
 * @remark
   为了精简代码，没有考虑复杂情况，如： constructor不是继承自原型链的等
   每个值进行了encodeURIComponent编码
 * @return {String} 采用"&"相连的字符串
 */
Q.param = function(a) {

	var s = [], add = function( key, value ) {
		// 如果value是function， 调用其返回值
		value = Q.isFunction(value) ? value() : value;
		s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	};

	if ( Q.isArray(a) ) {
		Q.each( a, function(k, v) {
			add( k, v );
		});

	} else {
		for ( var prefix in a ) {
			buildParams( prefix, a[prefix], add );
		}
	}

	function buildParams( prefix, obj,  add ) {
		if ( Q.isArray(obj) ) {
			Q.each( obj, function( i, v ) {

				if ( /\[\]$/.test( prefix ) ) {
					add( prefix, v );

				} else {
					buildParams( prefix + "[" + ( typeof v === "object" || Q.isArray(v) ? i : "" ) + "]", v, add );
				}
			});

		} else if ( obj != null && typeof obj === "object" ) {
			Q.each( obj, function( k, v ) {
				buildParams( prefix + "[" + k + "]", v, add );
			});
		} else {
			add( prefix, obj );
		}
	}

    return s.join("&").replace(/%20/g, "+");
 };/**
 * 将javacript对象转化成字符串
 * @name Q.stringify
 * @example
   Q.stringify(obj, separator)
 * @param {Object || Array ||} obj 需要解析的javacript对象 
 * @param {String} [separator] 可选参数，当obj为Object对象时，通过指定的分隔符进行分隔数据,返回json或string, 暂支持两种分隔符“," 和 "&", 默认是逗号","      
 * @remark
   为了精简代码，没有考虑复杂情况，如： constructor不是继承自原型链的等
 * @return {String} 转化成成采用分隔符相连的字符串，分隔符为逗号时，为json数据
 */
 Q.stringify = function(obj, separator) {
 	separator = separator || ",";
 	var isJson = separator.indexOf(",") > -1 ? true : false;
    var returnVal;
    if (obj != undefined) {
        switch (obj.constructor) {
        case Array:
            var vArr = "[";
            for (var i = 0; i < obj.length; i++) {
                if (i > 0) {
                	vArr += ",";
                }
                vArr += arguments.callee(obj[i]);
            }
            vArr += "]"
            return vArr;
        case String:
            if(isJson) {
                returnVal = '"' + encodeURIComponent(obj) + '"';
            } else {
                returnVal = encodeURIComponent(obj);
            }
            return returnVal;
        case Number:
            returnVal = isFinite(obj) ? obj.toString() : null;
            return returnVal;
        case Date:
            returnVal = "#" + obj + "#";
            return returnVal;
        default:
            if (typeof obj == "object") {
                var vobj = [];
                var tmpSeparator  = isJson ? ":" : "=";
                for (attr in obj) {
                    vobj.push(attr + tmpSeparator + arguments.callee(obj[attr], separator));
                }
                if (vobj.length > 0) {
                	if(isJson) {
                		return "{" + vobj.join(",") + "}";
                	} else {
                		return vobj.join(separator);
                	}
                } else {
                	return "{}";
                }
            } else {
                return encodeURIComponent(obj.toString());
            }
        }
    }
    return null;
 };/**
 * IE下高效率的字符串拼接类
 * @name Q.ArrayBuffer
 * @auther wangzhishou@qq.com
 */
Q.ArrayBuffer = function () {
	this.raw = [];
	this.idx = 0;
};

Q.ArrayBuffer.prototype = {
	/**
	 * 添加元素到数组末端
	 *
	 * @param {Any} elem 添加项
	 */
	push: function ( elem ) {
		this.raw[ this.idx++ ] = elem;
	},

	/**
	 * 连接数组项
	 *
	 * @param {string} split 分隔串
	 * @return {string}
	 */
	join: function ( split ) {
		return this.raw.join( split );
	}
};