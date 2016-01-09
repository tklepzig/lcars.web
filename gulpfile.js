'use strict';

// Gulp
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    pattern: '*',
    scope: ['dependencies', 'devDependencies']
});

// process sass file to css
gulp.task('sass', function() {
    return gulp.src('lcars.web.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename('lcars.web.min.css'))
        .pipe(gulp.dest('./dest'));
});


gulp.task('sass:dev', function() {
    return gulp.src('lcars.web.scss')
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
            cascade: false
        }))
        .pipe(plugins.rename('lcars.web.css'))
        .pipe(gulp.dest('./dest'));
});

gulp.task('default', function() {
    // watch me getting Sassy
    gulp.watch('*.scss', ['sass:dev']);
});
