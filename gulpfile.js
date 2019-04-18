var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlClean = require("gulp-htmlclean");
var uglify = require("gulp-uglify");
var strip = require("gulp-strip-debug");
var concat = require("gulp-concat");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");

// 生产环境
//var devMode = process.env.NODE_ENV == "production";
 
// 判断是不是开发环境
var devMode = process.env.NODE_ENV == "development";

var folder = {
    src: "./src/",  //开发目录文件夹
    dist: "./dist/"   //压缩打包后的文件夹
}

// 注册一个任务  任务名（自己起）  回调
gulp.task("images", function () {
    // 读取文件 /*是所有文件
    gulp.src(folder.src + "images/*")   
        // 检查那个文件夹下的。是否压缩了
        .pipe(newer(folder.dist + "images"))
        // 压缩图片
        .pipe(imagemin())
        // 文件流 没有会自动生成 文件流生成一次
        .pipe(gulp.dest(folder.dist + "images"))
})

// 压缩html
gulp.task("html", function () {
    // 读取文件 /*是所有文件
    var page = gulp.src(folder.src + "html/*")
    // 改变时页面自动刷新
    .pipe(connect.reload())
    // 如果不是开发环境不压缩
    if (!devMode) {
        // 压缩html
        page.pipe(htmlClean())
    }
    // 文件流 没有会自动生成 文件流生成一次
    page.pipe(gulp.dest(folder.dist + "html"))
})

// 压缩js
gulp.task("js", function () {
    // 读取文件 /*是所有文件
    var page = gulp.src(folder.src + "js/*")
    // 改变时页面自动刷新
    .pipe(connect.reload())
    if (!devMode) {
        // 去掉debugger语句
        page.pipe(strip())
        // 压缩js
        page.pipe(uglify())
    }
    // 文件流 没有会自动生成 文件流生成一次
    page.pipe(gulp.dest(folder.dist + "js"))
})

// 压缩css
gulp.task("css", function () {
    // 把压缩css 和 前缀 插件放在一起
    var options = [autoprefixer(), cssnano()];
    // 读取文件 /*是所有文件
    var page = gulp.src(folder.src + "css/*")
    // less 转css
    .pipe(less())
    // 改变时页面自动刷新
    .pipe(connect.reload())
   
    .pipe(postcss(options))
    
    // 文件流 没有会自动生成 文件流生成一次
    page.pipe(gulp.dest(folder.dist + "css"))
})

// 监听文件改变就自动重新打包 监听之后第二个参数是重新运行
gulp.task("watch", function () {
    gulp.watch(folder.src + "images/*", ["images"]);
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "css/*", ["css"]);
})

// 创建服务
gulp.task("server", function () {
    connect.server({
        // 设置端口号
        port: 8099,
        livereload: true
    });
})



// 让所有定义的自动打包
gulp.task("default", ["html", "images", "js", "css", "watch", "server"])