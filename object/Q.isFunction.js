/**
 * 判断对象是否是函数
 * @name Q.isFunction
 * @auther wangzhishou@qq.com
 * @param  {Object} object 需要判断的对象
 * @return {Bolean} 布尔值
 */
Q.isFunction = function(object) {
    return typeof object == "function";
};