/**
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
};