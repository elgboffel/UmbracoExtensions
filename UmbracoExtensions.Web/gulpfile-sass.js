/// <binding ProjectOpened='watch-bootstrap, watch-main' />
require('es6-promise').polyfill();

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require("gulp-autoprefixer");

gulp.task('bootstrap', function () {
    return gulp.src('content/components/bootstrap/scss/bootstrap.scss')
        .pipe(sourcemaps.init())  // Process the original sources
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer('last 2 version', '>5%'))
        .pipe(sourcemaps.write({ sourceRoot: './' })) // Add the map to modified source.
        .pipe(gulp.dest('content/css/'));
});

gulp.task('scss', function () {
    return gulp.src('content/scss/main.scss')
        .pipe(sourcemaps.init())  // Process the original sources
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer('last 2 version', '>5%'))
        .pipe(sourcemaps.write({ sourceRoot: './' })) // Add the map to modified source.
        .pipe(gulp.dest('content/css/'));
});

gulp.task("watch-bootstrap", function () {
    gulp.watch("content/components/bootstrap/**/*.scss", ["bootstrap"]);
});

gulp.task("watch-main", function () {
    gulp.watch("content/scss/**/*.scss", ["scss"]);
});