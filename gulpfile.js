var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

gulp.task('default', ['jshint']);

gulp.task('jshint', function () {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function () {
    return gulp.src('app/assets/css/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'));
});

//NOTE: In order to set the environment type pass in <b>--type production</b> to the gulp command
gulp.task('deploy-sky', function() {
    //Copy the sky dependencies including AngularJS
    gulp.src(['bower_components/bb-sky/dist/js/libs.min.js*']).pipe(gulp.dest('app/assets/js'));
    gulp.src('bower_components/bb-sky/dist/css/libs.css*').pipe(gulp.dest('app/assets/css'));

    //Copy sky library
    gulp.src(['bower_components/bb-sky/dist/js/sky.min.js*']).pipe(gulp.dest('app/assets/js'));
    gulp.src('bower_components/bb-sky/dist/css/sky.css*').pipe(gulp.dest('app/assets/css'));

    //Copy fonts
    gulp.src('bower_components/bb-sky/dist/css/fonts/**').pipe(gulp.dest('app/assets/css/fonts'));
});

//We need to build any external dependencies that we have
gulp.task('deploy-bluemoon-libraries', function () {
    gulp.src(['bower_components/restangular/dist/restangular.js', 'bower_components/underscore/underscore.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bluemoon-libs.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/js'));
});
