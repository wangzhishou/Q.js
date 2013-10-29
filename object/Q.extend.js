/**
 * 将源对象的所有属性拷贝到目标对象中
 * @author wangzhishou@qq.com
 * @name Q.extend
 * @function
 * @example 
   Q.extend(target, source)
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @remark
 * 
	1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
	2.源对象的prototype成员不会拷贝。            
 * @return {Object} 目标对象
 */
Q.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }    
    return target;
};