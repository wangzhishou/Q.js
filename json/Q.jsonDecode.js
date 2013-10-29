/**
 * 将字符串解析成json对象。
 * @name Q.jsonDecode
 * @example
   Q.jsonDecode(data)
 * @param {string} data 需要解析的字符串
 * @remark
 * 不会自动祛除空格。        
 * @returns {JSON} 解析结果json对象
 */
Q.jsonDecode = function (data) {
    return (new Function("return (" + data + ")"))();
};