/**
 * 显示元素
 * @name Q.show
 * @param {HTMLElement|string} arguments 目标元素或目标元素的id
 */
Q.show = function() {
    for (var i = 0, n = arguments.length; i < n; i++) {
        Q(arguments[i]).style.display = "";
    }
};