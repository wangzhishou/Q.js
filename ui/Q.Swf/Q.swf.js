/**
 * Flash创建类, 包含了常用属性, 方法名, 参数位置参考了SWFObject
 * @auther wangzhishou@qq.com
 * 
 * @static
 * @param {String} url  		必选参数，Flash文件路径。
 * @param {String} [id]   		可选参数，页面中Flash元素名称。
 * @param {String} [width]    	可选参数，宽度, 默认是500。
 * @param {String} [height]   	可选参数，高度,默认是375。
 * @param {String} [version]  	可选参数，flash依赖的版本号，精确到3位版本号, 默认是：7.0.0
 * @param {String} [bgcolor]  	可选参数，背景颜色, 默认是白色
 * @param {Object} [params]   	可选参数，参数对象
 * @param {Object} [vars]     	可选参数，变量对象
 * @remark
 	默认参数参照：
 	var defaultParams = {
        'wmode'             : 'Window',
        'scale'             : 1,
        'quality'           : 1,
        'play'              : 1,
        'loop'              : 1,
        'menu'              : 1,
        'salign'            : 1,
        'bgcolor'           : 1,
        'base'              : 1,
        'allowscriptaccess' : 'samedomain',
        'allownetworking'   : 1,
        'allowfullscreen'   : 1,
        'seamlesstabbing'   : 1,
        'devicefont'        : 1,
        'swliveconnect'     : 1,
        'flashvars'         : 1,
        'movie'             : 1
    };
 * @return {String} Html片段
 */
Q.Swf = function(url, id, width, height, version, bgcolor, params, vars) {
    /**
     * 参数初始化
     */
	this.url              = url;
	this.id               = id      || "Flash" + (new Date().getTime());
	this.width            = width   || 500;
	this.height           = height  || 375;
	this.version          = version || "7.0.0";
	this.params           = params  || {};
	this.vars             = vars    || {};
	this.params['bgcolor']= bgcolor || "#FFFFFF";
};

/**
 * 创建Flash类
 */
Q.Swf.prototype = {
	/**
	 * 输出显示到页面中
	 * @param {String} container 可选参数，是否输出到页面元素中，默认是文档流方式。
	 */
	write : function(container) {
		container = Q(container);
		var version = this.getVersion();
		if (this.compareVersions(version, this.version) >= 0) {
			var html = this.crateHTML(this.url, this.id, this.width, this.height, this.params, this.vars);
			if(container) {
				container.innerHTML = html;
			} else {
				document.write(html);
			}
		} else {
			var tipMsg = "The version numbers do not match。";
			if (container) {
				container.innerHTML = tipMsg;
			} else {
				document.write(tipMsg);
			}
		}
	},

	/**
	 * 添加参数
	 * @param {String} param Flash显示所需参数
	 * @param {String} value vlaue flash显示所需值
	 */
	addParam : function (param, val) {
		this.params[param] = val;
	},

	/**
	 * 给Flash设置参数变量值
	 * @param {String} param Flash显示所需参数
	 * @param {String} value vlaue flash显示所需值
	 */
	addVariable : function(key, val) {
		this.vars[key] = val;
	},

	/**
	 * 比较flash版本号大小
	 * 说明： 1时v1>v2，-1时v1<v2，0时v1==v2。
	 *
	 * @public
	 * @static
	 * @param {String} v1 flash版本号1
	 * @param {String} v2 flash版本号2
	 * @return {Number} 版本号比较结果
	 */
	compareVersions : function(v1, v2) {
		if (!v1) {
			return -1;		
		}
	    v1 = v1.split(".");
	    v2 = v2.split(".");
	    for (var i = 0; i < 3; i++) {
	        var val1 = parseInt(v1[i], 10);
	        var val2 = parseInt(v2[i], 10);
	        if (val1 > val2) {
	            return 1;
	        } else if (val1 < val2) {
	            return -1;
	        }
	    }
	    return 0;
	},

	/**
	 * 获得flash对象
	 *
	 * @public
	 * @static
	 * @param {String} movieName 文档中flash影片名称
	 * @return {object} flash对象引用
	 */
	movie : function (movieName) {
  		return (Q.ie() < 9) ? window[movieName] : document[movieName];
	},

	/**
     * Js调用AS函数
     *
     * @public
     * @param {String} argument 传递参数 第一个参数为调用的函数的函数对象
     */
    call: function () {
        try {
	    	var id 	 = this.id;
            var args = Array.prototype.slice.call(arguments);
            var func = args.shift();
            var fObj = this.movie(id);
            fObj[func].apply(fObj, args);
        } catch (e) {}
    },

	/**
	 * 获得浏览器flash版本
	 *
	 * @public
	 * @static
	 * @return {String} 获得flash版本号
	 */
	getVersion : function () {
	    var n = navigator;
	    if (n.plugins && n.mimeTypes.length) {
	        var a = n.plugins["Shockwave Flash"];
	        if (a && a.description) {
	            return a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0";
	        }
	    } else if (window.ActiveXObject && !window.opera) {
	        for (var i = 10; i >= 2; i--) {
	            try {
	                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
	                if (c) {
	                    return i + ".0.0";
	                    break;
	                }
	            } catch(e) {}
	        }
	    }
	},

    /**
     * 创建html片段
	 * @param {String} id   	页面中Flash元素名称
	 * @param {String} url  	源路径
	 * @param {String} width    宽度
	 * @param {String} height   高度
	 * @param {Object} params   参数对象
	 * @param {String} vars     变量对象
	 * @param {String} align    对齐方式，缺省是 middle
	 * @return {String} Html片段
     */
	crateHTML : function(url, id, width, height, params, vars) {
	    var str = [];
	    var algin = arguments[6] ? 'align=' + arguments[6] : 'align="middle"';
	    str.push('<object ',
	             'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ',
	             'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" ',
	             'width="' + width + '" ',
	             'height="' + height + '" ',
	             'id="' + id + '" ',
		     algin + '>');
	    for (var i in params) {
	        str.push('<param name="' + i + '" value="' + params[i] + '" />');
	    }
	    str.push('<param name=\"flashvars\" value=\"' + vars + '\">');
		str.push('<param name=\"movie\" value=\"' + url + '\">');
	    delete params["movie"];
	    var pstr = Q.stringify(params, " ");
	    str.push('<embed src="' + url + '" ',
	             'flashvars="' + vars + '" ',
	             'width="' + width + '" ',
	             'height="' + height + '" ',
	             'name="' + id + '" ',
	             pstr.replace("%23", "#") + ' ',
	             algin + ' ',
	             'type="application/x-shockwave-flash" ',
	             'pluginspage="http://www.macromedia.com/go/getflashplayer">',
	             '</object>');    
	    return str.join('');
    }	
};