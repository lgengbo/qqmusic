(function ($, root) {
    function controlManger(len) {
        this.index = index;
        this.len = len;
    }

    controlManger.prototype = {
        prev: function () {
            // index --;
            // 上一首
            return this.getIndex(-1);
        },
        next: function () {
            // index ++;
            // 下一首
            return this.getIndex(1);
        },
        getIndex: function (val) {
            var index = this.index;
            var len = this.len;
            var curIndex = (index + len + val) % len;
            this.index = curIndex;
            return curIndex;
        }
    }

    // 暴露方法
    root.controlManger = controlManger;
})(window.Zepto, window.player || (window.player = {}));