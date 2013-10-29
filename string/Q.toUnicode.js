/**
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
};