//utils
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');
const rename = require('gulp-rename');

//css
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//babel + browserify
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');


gulp.task('default', ['sass'], () => {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "demo.html"
        }
    });
    gulp.watch("./demo/*.html").on('change', browserSync.reload);
    gulp.watch('style.scss', ['sass']);
    gulp.watch('./elements/**/*.scss', ['sass']);
});

gulp.task('sass', ['sass-min'], () => {
    const plugins = [autoprefixer({browsers: ['last 2 versions']})];
    return gulp.src('style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('sass-min', () => {
    const plugins = [autoprefixer({browsers: ['last 2 versions']}), cssnano()];
    return gulp.src('style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'))
});