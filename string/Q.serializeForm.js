/**
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
};