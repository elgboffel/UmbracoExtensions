/// <binding ProjectOpened='watch-bootstrap, watch-main' />
/* 
    {
    "name": "ClientName.Web",
    "version": "0.0.1",
    "description": "",
    "author": "Datagraf",
    "license": "ISC",
    "devDependencies": {
        "gulp": "^3.9.1",
        "gulp-watch": "^4.3.5",
        "gulp-less": "^3.0.5",
        "gulp-sourcemaps": "^1.6.0",
        "less-plugin-clean-css": "^1.5.1"
    }
    }
*/
var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require("gulp-sourcemaps"),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('bootstrap', function () {
    return gulp.src('content/components/bootstrap/less/bootstrap.less')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./')) // Add the map to modified source.
        .pipe(gulp.dest('content/css/'));
});

gulp.task('fontawesome', function () {
    return gulp.src('content/components/font-awesome/less/font-awesome.less')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./')) // Add the map to modified source.
        .pipe(gulp.dest('content/css/'));
});

gulp.task('main', function () {
    return gulp.src('content/less/main.less')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(sourcemaps.write('./')) // Add the map to modified source.
        .pipe(gulp.dest('content/css/'));
});

gulp.task("watch-bootstrap", function () {
    gulp.watch("content/components/bootstrap/less/**/*.less", ["bootstrap"]);
});

gulp.task("watch-main", function () {
    return gulp.watch("content/less/**/*.less", ["main"]);
});