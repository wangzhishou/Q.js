/**
 * 给一段字符串生成一串hashCode值
 * @name Q.hashCode
 * @param {String} source 源字符串内容
 * @return {int} 返回int类型的数值
 * @auther wangzhishou.com
 */
Q.hashCode = function(source) {
    var hash = 0;
    if (source.length == 0) {
        return hash;
    }
    for (var i = 0, n = source.length; i < n; i++) {
        var character = source.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
    }
    return hash;
};