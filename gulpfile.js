const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
// const processhtml = require('gulp-processhtml')
// const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const image = require('gulp-image');

const browser = require('browser-sync').create();

const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },
    js: {
        src: 'app/js/**/*.js',
        dest: 'build/js'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    html: {
        src: 'app/*.html',
        dest: 'build/'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    }
}

function browserSync(done){
    browser.init({
        server:{
            baseDir: "./build"
        },
        port: 4000
    })
    done();
}
function browserSyncReload(done){
    browser.reload()
    done()
}
function styles(){
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        // .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browser.stream())
}
function images(){
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        // .pipe(image())
        .pipe(browser.stream())
}
function font(){
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browser.stream())
}
function js(){
    return gulp.src(paths.js.src)
    // .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browser.stream())
}

function html(){
    return gulp.src(paths.html.src)
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano()))
    .pipe(gulpif(['*.jpg','*.png'], image()))
    // .pipe(gulpif('*.png', image()))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browser.stream()) 
}
function watch(){
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.images.src, images)
    gulp.watch(paths.fonts.src, font)
    gulp.watch(paths.js.src, js)
    gulp.watch(paths.html.src, html)
    gulp.watch('./app/index.html', gulp.series(browserSyncReload))
}
const build = gulp.parallel(styles, images, font, js, html)
gulp.task('build', build)

gulp.task('default', gulp.parallel(watch,build,browserSync))