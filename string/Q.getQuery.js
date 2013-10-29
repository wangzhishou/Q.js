/**
 * 根据参数名从目标URL中获取参数值
 * @name Q.getQuery
 * @example Q.getQuery(url, key)
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 *             
 * @returns {string|null} - 获取的参数值，获取不到时返回null
 */
Q.getQuery = function (url, key) {
    var reg = new RegExp("(^|&|\\?|#)" + key + "=([^&#]*)(&|$|#)", "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }    
    return null;
};