/**
 * 将javascript对象解析成json字符串。
 * @name Q.jsonEncode
 * @example
   Q.jsonEncode(obj)
 * @param {Object || Array ||} obj 需要解析的javacript对象 
 * @remark
 * 为了精简代码，没有考虑复杂情况，如： constructor不是继承自原型链的等。        
 * @return {String} 解析结果为json格式字符串
 */
Q.jsonEncode = function (obj) {
    return Q.stringify(obj);
};