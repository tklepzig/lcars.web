'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: '*',
    scope: ['dependencies', 'devDependencies']
});

gulp.task('scss', function () {
    return gulp.src('scss/lcars.web.scss')
        .pipe(plugins.sass().on('error', plugins.util.log))
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.rename('lcars.web.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename('lcars.web.min.css'))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('scss:static', function () {
    return gulp.src(["scss/**/*"])
        .pipe(gulp.dest("dist/scss"));
});
gulp.task('scss:watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('dev', ['scss', 'scss:watch', 'scss:static']);
gulp.task('default', ['scss', 'scss:static']);
