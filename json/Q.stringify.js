/**
 * 将javacript对象转化成字符串
 * @name Q.stringify
 * @example
   Q.stringify(obj, separator)
 * @param {Object || Array ||} obj 需要解析的javacript对象 
 * @param {String} [separator] 可选参数，当obj为Object对象时，通过指定的分隔符进行分隔数据,返回json或string, 暂支持两种分隔符“," 和 "&", 默认是逗号","      
 * @remark
   为了精简代码，没有考虑复杂情况，如： constructor不是继承自原型链的等
 * @return {String} 转化成成采用分隔符相连的字符串，分隔符为逗号时，为json数据
 */
 Q.stringify = function(obj, separator) {
 	separator = separator || ",";
 	var isJson = separator.indexOf(",") > -1 ? true : false;
    var returnVal;
    if (obj != undefined) {
        switch (obj.constructor) {
        case Array:
            var vArr = "[";
            for (var i = 0; i < obj.length; i++) {
                if (i > 0) {
                	vArr += ",";
                }
                vArr += arguments.callee(obj[i]);
            }
            vArr += "]"
            return vArr;
        case String:
            if(isJson) {
                returnVal = '"' + encodeURIComponent(obj) + '"';
            } else {
                returnVal = encodeURIComponent(obj);
            }
            return returnVal;
        case Number:
            returnVal = isFinite(obj) ? obj.toString() : null;
            return returnVal;
        case Date:
            returnVal = "#" + obj + "#";
            return returnVal;
        default:
            if (typeof obj == "object") {
                var vobj = [];
                var tmpSeparator  = isJson ? ":" : "=";
                for (attr in obj) {
                    vobj.push(attr + tmpSeparator + arguments.callee(obj[attr], separator));
                }
                if (vobj.length > 0) {
                	if(isJson) {
                		return "{" + vobj.join(",") + "}";
                	} else {
                		return vobj.join(separator);
                	}
                } else {
                	return "{}";
                }
            } else {
                return encodeURIComponent(obj.toString());
            }
        }
    }
    return null;
 };