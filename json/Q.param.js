/**
 * 将javacript对象转化成url参数字符串
 * @name Q.param
 * @example
   Q.param(obj)
 * @param {Object || Array ||} obj 需要解析的javacript对象  
 * @remark
   为了精简代码，没有考虑复杂情况，如： constructor不是继承自原型链的等
   每个值进行了encodeURIComponent编码
 * @return {String} 采用"&"相连的字符串
 */
Q.param = function(a) {

	var s = [], add = function( key, value ) {
		// 如果value是function， 调用其返回值
		value = Q.isFunction(value) ? value() : value;
		s[ s.length ] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	};

	if ( Q.isArray(a) ) {
		Q.each( a, function(k, v) {
			add( k, v );
		});

	} else {
		for ( var prefix in a ) {
			buildParams( prefix, a[prefix], add );
		}
	}

	function buildParams( prefix, obj,  add ) {
		if ( Q.isArray(obj) ) {
			Q.each( obj, function( i, v ) {

				if ( /\[\]$/.test( prefix ) ) {
					add( prefix, v );

				} else {
					buildParams( prefix + "[" + ( typeof v === "object" || Q.isArray(v) ? i : "" ) + "]", v, add );
				}
			});

		} else if ( obj != null && typeof obj === "object" ) {
			Q.each( obj, function( k, v ) {
				buildParams( prefix + "[" + k + "]", v, add );
			});
		} else {
			add( prefix, obj );
		}
	}

    return s.join("&").replace(/%20/g, "+");
 };