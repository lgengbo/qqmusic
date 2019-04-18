// 实现渲染

// 立即执行函数，防止全局污染
//      (function ($,root) {
//          function init() {
//           }
//          root.init = init;
//      })(window.Zepto,widow.player || {});
//通过widow.player暴露函数

(function ($, root) {
    var $scope = $(document.body);
    // 渲染歌曲信息
    function renderInderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>'
            + '<div class="singer-name">' + info.singer + '</div>'
            + '<div class="album-name">' + info.album + '</div>';

        $scope.find(".song-info").html(html);
    }

    // 渲染图片
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            // 高斯模糊  图片和元素
            root.blurImg(img,$scope);
            // 插入图片
            $scope.find(".song-img img").attr("src",src);
        }
    }

    // 喜欢和不喜欢
    function renderIslike(islike) {
        // 判断是否喜欢
        if(islike){
            $scope.find(".like-btn").addClass("liking");
        }else{
            $scope.find(".like-btn").removeClass("liking");
        }
    }

    // 暴露接收数据
    root.render = function render(data) {
        renderInderInfo(data);
        renderImg(data.image);
        renderIslike(data.isLike)
    }
})(window.Zepto, window.player || (window.player = {}));