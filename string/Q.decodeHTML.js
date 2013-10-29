/**
 * 对目标字符串进行html解码
 * @name 
   Q.decodeHTML
 * @example
   Q.decodeHTML(str)
 * @param {string} str 目标字符串 *             
 * @return {string} html解码后的字符串
 */
Q.decodeHTML = function (str) {
    var str = String(str)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
    return str.replace(/&#([\d]+);/g, function(a, b){
        return String.fromCharCode(parseInt(b, 10));
    });
};