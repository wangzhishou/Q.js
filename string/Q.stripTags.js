/**
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
};