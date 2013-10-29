/**
 * 获取页面视觉区域宽度
 * @name Q.clientWidth
 * @example Q.clientWidth()             
 * @return {number} 页面视觉区域宽度
 */
Q.clientWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};