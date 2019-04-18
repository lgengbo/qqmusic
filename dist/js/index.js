// 让可以使用$.
var $ = window.Zepto;
// 接收到render函数
var root = window.player;
var $scope = $(document.body);
var index = 0;
var songList;
// 实例化模块化音乐
var audio = new root.audioControl();

// 点击切换歌曲
function bindEvent() {
    // 上一首
    $scope.on("click",".prev-btn",function () {
        // if (index === 0) {
        //     index = songList.length - 1;
        // }else{
        //     index --;
        // }    
        // 根据index的不同渲染不同的数据  
        var index = controlManger.prev();  
        root.render(songList[index]);
    });
    // 下一首
    $scope.on("click",".next-btn",function () {
        // if (index === songList.length - 1) {
        //     index = 0;
        // }else{
        //     index ++;
        // } 
        var index = controlManger.next();
        // 根据index的不同渲染不同的数据      
        root.render(songList[index]);
    });
    // 自定义事件 播放哪首歌,第一个参数时里面的方法  第二个参数传值
    $scope.on("play:change",function (e,index) {
        audio.getAudio(songList[index].audio);
        if (audio.status == "play") {
            audio.play();
        }
    });

    // 切换歌曲 
    $scope.on("click",".play-btn",function () {
        if (audio.status == "play") {
            audio.pause();
        }else{
            audio.play();
        }
        //点击切换播放按钮图片
        $(this).toggleClass("pause");
    });
}

// ajax
function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            // 传数据到render
            root.render(data[0]);
            songList = data;  
            bindEvent();
            // 引入上一首下一首的方法
            controlManger = new root.controlManger(data.length);
            // 委托自定义方法，第二个参数时歌曲传值
            $scope.trigger("play:change",0);
        },
        error:function () {
            console.log('error');    
        }   
    })
}

// 请求数据
getData("../mock/data.json");
