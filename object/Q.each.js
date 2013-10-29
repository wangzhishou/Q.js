/**
 * 遍历对象中所有元素
 * @name Q.each
 * @auther wangzhishou@qq.com
 * @example Q.each(source, iterator)
 * @param {Object} source 需要遍历的对象
 * @param {Function} callback 对每个对象元素进行调用的函数，function (key, value)
 *             
 * @return {Object} 遍历的Object
 */
Q.each = function( object, callback) {
	var name, i = 0,
		length = object.length,
		isObj = length === undefined || Q.isFunction( object );

	if ( isObj ) {
		for ( name in object ) {
			if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
				break;
			}
		}
	} else {
		for ( ; i < length; ) {
			if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
				break;
			}
		}
	}
	return object;
};