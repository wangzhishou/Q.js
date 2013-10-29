/**
 * �ڸǲ�ؼ�
 *
 * <pre>
 * ����js�Ե�ǰҳ���Ⱥ͸߶�ȡֵ��ʱ�򣬻�ȡ����margin��ֵ
 * ��IE/Firefox/Safari��������ҳ��bodyһ��Ĭ�ϵ�marginֵ
 * ����maskֻ��ʹ����body��marginΪ0��ҳ����
 * Ϊ�˱��ڲ����Լ����������֮��Ĳ����ԣ�ͨ��ҳ�涼������marginΪ0
 * </pre>
 *
 * @name Q.mask
 * @auther wangzhishou@qq.com
 * @description �ڸǲ�ؼ�
 * @param {options} options ����ѡ��
 * @param {htmlElement || String} target ���ֶ���Ĭ����document
 * @param {Number} options.zIndex �ڸǲ�Ĳ㼶��Ĭ����999
 * @param {Boolean} options.isIframe �Ƿ���Iframe�ڸǣ�����ie������µ�bug, Ĭ����false�����ڸ�
 */
Q.Mask = function(options) {    
    options = options || {};
    this.isIframe  = options.isIframe || false;
    this.zIndex = options.zIndex || 9999;
    this.doc = options.target ? Q(target) : document;
    this.id = "Mark" + (new Date()).getTime();
    this.iframeId  = "MarkIframe" + (new Date()).getTime();
    this.init();
};

Q.Mask.prototype = {
    /**
     * ��ʼ��
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
        var mask = Q(this.id);        
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
     * ��ʾ����
     * @param {Number} zIndex ��ʾ�Ĳ㼶, Ĭ����9999
     * @public
     */
    show: function(zIndex) {
        zIndex = zIndex || this.zIndex;
        this.init();
        var mask = Q(this.id);
        var commonStyle = 'position:absolute;z-index:'+ zIndex +';left:0;top:0;width:' + this.w + 'px;height:' + this.h + 'px;';
        if (mask) {
            mask.style.cssText = commonStyle + 'background:#000;opacity:0.3;filter:alpha(opacity=30);';
        }        
        if (this.isIframe) {
            var iframe = Q(this.iframeId);
            if (iframe) {
                iframe.style.cssText = commonStyle;
            }
        }
    },

    /**
     * �����ڸǲ�
     * @public
     */
    hide: function() {
        var mask = Q(this.id);
        if (!mask) {
            return;
        }
        var commonStyle = 'position:absolute;left:0;top:0;width:1px;height:1px;';
        mask.style.cssText = commonStyle + 'background:#000;opacity:0.3;filter:alpha(opacity=30);';      
        if (this.isIframe) {
            var iframe = Q(this.iframeId);
            if (iframe) {
                iframe.style.cssText = commonStyle;
            }
        }
    }
};