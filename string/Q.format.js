/**
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
	opts为“string...”时，替换目标字符串中的{0}、{1}...部分。
		
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
};