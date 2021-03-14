var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename')
var watcher = require('gulp-watch')
var changed = require('gulp-changed')
// 自动监听
gulp.task('default', gulp.series(function () {
    watcher('./pages/**/*.scss', function () {
        miniSassPages()
    })
    watcher('./components/**/*.scss', function () {
        miniSassComponents()
    })

}))
// 手动编译
gulp.task('sass', gulp.parallel(miniSassPages, miniSassComponents))
// 编译过程
function miniSassPages() {
    return gulp.src('./pages/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(rename((path) => {
            path.extname = '.wxss'
        }))
        .pipe(changed('./pages'))
        .pipe(gulp.dest('./pages'))
        .pipe(rename((path) => {
            console.log('scss file has compiled to wxss:' + 'pages\\' + path.dirname + '\\' + path.basename + '.wxss')
        }))
}
function miniSassComponents() {
    return gulp.src('./components/**/*.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(rename((path) => {
            path.extname = '.wxss'
        }))
        .pipe(changed('./components'))
        .pipe(gulp.dest('./components'))
        .pipe(rename((path) => {
            console.log('scss file has compiled to wxss:' + 'components\\' + path.dirname + '\\' + path.basename + '.wxss')
        }))
}