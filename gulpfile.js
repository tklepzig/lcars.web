'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: '*',
    scope: ['dependencies', 'devDependencies']
});

gulp.task('sass', function() {
    return gulp.src('lcars.web.scss')
        .pipe(plugins.sass().on('error', plugins.util.log))
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.rename('lcars.web.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename('lcars.web.min.css'))
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch:sass', function() {
    gulp.watch('*.scss', ['sass']);
});


gulp.task('js', function() {
    return gulp.src('lcars.web.js')
        .pipe(gulp.dest('./dist'))
        .pipe(plugins.uglify().on('error', plugins.util.log))
        .pipe(plugins.rename('lcars.web.min.js'))
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch:js', function() {
    gulp.watch('lcars.web.js', ['js']);
});

gulp.task('dev', ['sass', 'js', 'watch:sass', 'watch:js']);
gulp.task('default', ['sass', 'js']);
