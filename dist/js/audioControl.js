(function ($, root) {
    function audioControl() {
        // 实列化
        this.audio = new Audio();
        // 默认停止
        this.status = "pause";
    }

    audioControl.prototype = {
        // 播放
        play: function () {
            this.audio.play();
            this.status = "play";
        },
        // 停止
        pause: function () {
            this.audio.pause();
            this.status = "pause";
        },
        // 得到数据
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();
        }
    }
    // 暴露方法
    root.audioControl = audioControl;
})(window.Zepto, window.player || (window.player = {}));