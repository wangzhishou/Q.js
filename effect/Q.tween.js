/**
 * 基于style样式的渐变类
 * @name Q.tween
 * @example
 * <pre>
 *   Q.tween(document.getElementById("el1"), {left：20，top：40});
 * </pre>
 * @author wangzhishou@qq.com
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Object} styleObject 需要改变元素的属性集合{left：20，top：40}
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {function} options.onComplete 动画结束后回调函数
 * @param {function} options.onTween 动画过程中回调，参数为变化率
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween = function(element, styleObject, options) {
    var _this         = Q.tween;
    element           = Q(element);
    options           = options || {};
    options.transform = options.transform || _this.transform;
    options.interval  = options.interval  || _this.interval;
    options.duration  = options.duration  || _this.duration;
    return _this.move(element, styleObject, options);
};

/**
 * 渐变的时间间隔,默认为20毫秒
 * @public
 */
Q.tween.interval = 20;

/**
 * 转换函数,默认为减减速运动
 * @public
 */
Q.tween.transform = function (x) {
    return 1 - Math.pow(1 - x, 3);
};

/**
 * 总时长(秒),默认为2000毫秒
 * @public
 */
Q.tween.duration = 2000;

/**
 * 开始渐变.
 * 渐变类的根据,所有渐变都是通过这个函数启动
 * @public
 * 
 * @param {Function} onTween 单步渐变的处理函数,该函数有传入参数x代表当前偏移量相对于总偏移量的比例
 * @param {Function} onComplete 渐变完成后回调函数
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {Number} options.onComplete 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween.start = function (onTween, onComplete, options) {
    var interval  = options.interval;
    var duration  = options.duration;
    var transform = options.transform;
    var end       = transform(1);
    var t         = 0;
    function callback() {
        t += interval;
        var x = t / duration;
        if (x >= 1) {
            onTween(1);
            onComplete && onComplete();
            clearInterval(task);
        } else {
            onTween(transform(x) / end);
        }
    }
    var task = setInterval(callback, interval);
    return task;
};

/**
 * 指定目标元素移动
 * @public
 * @param {HtmlElement || String} element 需要操作的目标元素
 * @param {Object} styleObject 需要改变元素的属性集合{left：20，top：40}
 * @param {Object} options 可选参数集
 * @param {Function} options.transform 渐变曲线函数,可选,默认为减减速运动
 * @param {Number} options.interval 单步时间间隔(毫秒数),可选,默认为40毫秒
 * @param {Number} options.duration 动画的持续时间长度
 * @param {Number} options.onComplete 动画结束后回调函数
 * @return {Interval} Interval对象,用户可以通过clearInterval终止渐变
 */
Q.tween.move = function (element, styleObject, options) {
    element = Q(element);
    var originalCssText = element.style.cssText;
    var tempStyle       = {};
    for (var i in styleObject) {
        var oValue   = Q.css(element, i);
        var v        = parseFloat(oValue);
        tempStyle[i] = isNaN(v) ? 0 : v;
    }
    function onTween(rate) {
        var sArray = [];
        for (var i in styleObject) {
            var start = tempStyle[i];
            var end   = parseFloat(styleObject[i]);
            var val   = start + (end - start) * rate; 
            switch (i) {
                case "opacity":             
                    if (element.style.filter) {
                        sArray.push("filter:alpha(opacity=" + val * 100 + ");");
                        if (!element.currentStyle || !element.currentStyle.hasLayout) {
                            sArray.push("zoom:1");
                        }
                    } else {
                        sArray.push(i + ":" + val + ";");
                    }
                    break;
                default:
                    sArray.push(i + ":" + val + "px;");
                    break;
            }
        }
        element.style.cssText = originalCssText + ";" + sArray.join("");
        options.onTween && options.onTween(rate);
    }
    function onComplete() {
        options.onComplete && options.onComplete();
    }
    return this.start(onTween, onComplete, options);
};