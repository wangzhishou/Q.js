/**
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
 };