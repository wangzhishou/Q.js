/**
 * 判断目标参数是否Array对象
 * @name Q.isArray
 * @example baidu.lang.isArray(source)
 * @param {Any} source 目标参数
 *             
 * @return {boolean} 类型判断结果
 */
Q.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};