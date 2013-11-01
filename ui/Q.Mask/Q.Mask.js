/**
 * 遮盖层控件
 *
 * <pre>
 * 由于js对当前页面宽度和高度取值的时候，获取不到margin的值
 * 而IE/Firefox/Safari浏览器会给页面body一个默认的margin值
 * 所以mask只能使用在body的margin为0的页面中
 * 为了便于布局以及屏蔽浏览器之间的差异性，通常页面都会设置margin为0
 * </pre>
 *
 * @name Q.mask
 * @auther wangzhishou@qq.com
 * @description 遮盖层控件
 * @param {options} options 参数选项
 * @param {htmlElement || String} target 遮罩对象，默认是document
 * @param {Number} options.zIndex 遮盖层的层级，默认是999
 * @param {Boolean} options.isIframe 是否用Iframe遮盖，避免ie浏览器下的bug, 默认是false，不遮盖
 */
Q.Mask = function(options) {    
    options = options || {};
    this.isIframe  = options.isIframe || false;
    this.zIndex = options.zIndex || 9999;
    this.doc = options.target ? Q(options.target) : document;
    this.id = "Mark" + (new Date()).getTime();
    this.iframeId  = "MarkIframe" + (new Date()).getTime();
    this.init();
};

Q.Mask.prototype = {
    /**
     * 初始化
     */
    init: function() {
        var doc = this.doc;
        if (doc == document) {
            this.w = doc.body.clientWidth;
            this.h = Math.max(doc.documentElement.clientHeight, Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight));

        } else {
            this.w = doc.offsetWidth;
            this.h = doc.offsetHeight;
        }
        var mask = Q("#" +this.id);        
        if (!mask) {
            mask = Q.tag('div', {
                "id" : this.id
            });
            document.body.appendChild(mask);
        }
        if (this.isIframe) {
            var iframe = Q.tag("iframe", {
                "id"    : this.iframeId,
                "src"   : "about:blank",
                "allowtransparency" : true,
                "frameborder" : "0"
            });
            document.body.appendChild(iframe);
        }
    }, 

    /**
     * 显示遮罩
     * @param {Number} zIndex 显示的层级, 默认是9999
     * @public
     */
    show: function(zIndex) {
        zIndex = zIndex || this.zIndex;
        this.init();
        var mask = Q("#" +this.id);
        var commonStyle = 'position:absolute;z-index:'+ zIndex +';left:0;top:0;width:' + this.w + 'px;height:' + this.h + 'px;';
        if (mask) {
            mask.style.cssText = commonStyle + 'background:#000;opacity:0.3;filter:alpha(opacity=30);';
        }        
        if (this.isIframe) {
            var iframe = Q("#" +this.iframeId);
            if (iframe) {
                iframe.style.cssText = commonStyle;
            }
        }
    },

    /**
     * 隐藏遮盖层
     * @public
     */
    hide: function() {
        var mask = Q("#" +this.id);
        if (!mask) {
            return;
        }
        var commonStyle = 'position:absolute;left:0;top:0;width:1px;height:1px;';
        mask.style.cssText = commonStyle + 'background:#000;opacity:0.3;filter:alpha(opacity=30);';      
        if (this.isIframe) {
            var iframe = Q("#" +this.iframeId);
            if (iframe) {
                iframe.style.cssText = commonStyle;
            }
        }
    }
};