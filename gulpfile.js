"use strict";
// process.env.DISABLE_NOTIFIER = true;

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    order = require("gulp-order"),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect');
    // base64 = require('gulp-base64');



gulp.task('sass', function () {
    gulp.src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 7 versions'],
            cascade: false
        }))

        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload())
        .pipe(notify('Done css!'));
});

//js
gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(plumber())
        //.pipe(order([
        //]))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload())
        .pipe(notify('Done js!'));
});



gulp.task('connect', function () {
    connect.server({
        root: 'dist/',
        port: 8000,
        livereload: true
    });
});


// "use strict";
// var gulp = require('gulp'),
//     cssBase64 = require('gulp-css-base64'); //transform all resources found in a CSS into base64-encoded data URI strings
// //You can ignore a resource with a comment /*base64:skip*/ in CSS file after url definition.
//
// gulp.task('default', function () {
//     return gulp.src('css/styles/main.css')
//         .pipe(cssBase64())
//         .pipe(gulp.dest('css/styles/'));
// });

//Watch
gulp.task('watch', function () {
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js'], ['js']);
    //gulp.watch('./src/styles/**/*.styl', ['stylus']);
    //gulp.watch('./src/images/sprite/*', ['sprite']);
});

gulp.task('compile', ['sass', 'js']);

//Default Task
gulp.task('default', ['connect', 'sass', 'js', 'watch']);
