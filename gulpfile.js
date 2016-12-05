/*
 * @Author: iceStone
 * @Date:   2016-01-27 10:21:56
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-12-01 11:12:42
 */

'use strict';
/**
 * 1. LESS编译 压缩 合并
 * 2. JS合并 压缩 混淆
 * 3. img复制
 * 4. html压缩
 */

// 在gulpfile中先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');
var less = require('gulp-less');//css编译
var cssnano =require('gulp-cssnano');//css压缩
var concat =require('gulp-concat');//js合并
var uglify = require('gulp-uglify');
var htmlmin =require('gulp-htmlmin');
var browserSync =  require('browser-sync');


// 1.LESS编译 压缩 合并
gulp.task('style',function(){
   //这里是在执行style任务
   gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
   .pipe(less())  //编译
   .pipe(cssnano())//压缩
   .pipe(gulp.dest('dist/styles'))
   .pipe(browserSync.reload({
      stream: true
    }));

});

var concat = require('gulp-concat');


// 2. JS合并 压缩混淆  如果压缩混淆再合并 那么混淆后的AB再合并会造成冲突     
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js')) //合并成一个名为all的文件
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

// 3. 图片复制
 gulp.task('image',function(){
      gulp.src('src/images/*.*')
      .pipe(gulp.dest('dist/images'))
      .pipe(browserSync.reload({
      stream: true
    }));
 });
// 4. HTML
 gulp.task('html',function(){
    gulp.src('src/*.html')
 	.pipe(htmlmin({
 		collapseWhitespace:true,  //删除空白
        removeComments:true       //删除注释
 	}))
 	.pipe(gulp.dest('dist'))
 	.pipe(browserSync.reload({
      stream: true
    }));
 });

 //自动执行任务
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: ['dist']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
  gulp.watch('src/styles/*.less',['style']);
  gulp.watch('src/scripts/*.js',['script']);
  gulp.watch('src/images/*.*',['image']);
  gulp.watch('src/*.html',['html']);
  });