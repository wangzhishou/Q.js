/**
 * IE下高效率的字符串拼接类
 * @name Q.ArrayBuffer
 * @auther wangzhishou@qq.com
 */
Q.ArrayBuffer = function () {
	this.raw = [];
	this.idx = 0;
};

Q.ArrayBuffer.prototype = {
	/**
	 * 添加元素到数组末端
	 *
	 * @param {Any} elem 添加项
	 */
	push: function ( elem ) {
		this.raw[ this.idx++ ] = elem;
	},

	/**
	 * 连接数组项
	 *
	 * @param {string} split 分隔串
	 * @return {string}
	 */
	join: function ( split ) {
		return this.raw.join( split );
	}
};