/**
 * 对Unicode编码进行解码
 * @name Q.unUnicode
 * @example
   Q.unUnicode(source)
 * @param {string} source 已编码的目标字符串            
 * @return {string} 解码后的字符串
 */
Q.unUnicode = function(source) {
  return eval(source.toUpperCase().replace("\\", "\\\\"));
};