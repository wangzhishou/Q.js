/**
 * 获取页面视觉区域高度
 * @name Q.clientHeight
 * @example Q.clientHeight()
 * @return {number} 页面视觉区域高度
 */
Q.clientHeight = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};