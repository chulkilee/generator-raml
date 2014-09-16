'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var plugins = require('gulp-load-plugins')();

var files = {
  src: 'src/**/*.raml',
  dist: 'dist'
};

var onError = function onError (err) {
  gutil.beep();
  gutil.log(gutil.colors.red('Error caught:'), err);
  if (process.env.IGNORE_ERROR) {
    gutil.log(gutil.colors.red('Ignore error: keep going'));
  } else {
    gutil.log(gutil.colors.red('Terminated'));
    process.exit(-1);
  }
};

var port = process.env.PORT || 8080;

gulp.task('default', ['build']);

gulp.task('build', function () {
  return gulp.src(files.src)
    .pipe(plugins.plumber({errorHandler: onError}))
    .pipe(plugins.raml2html())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return gulp.src(files.dist, {read: false})
    .pipe(plugins.rimraf());
});

gulp.task('open', function(){
  gulp.src(files.dist + '/index.html')
    .pipe(plugins.open('', {url: 'http://localhost:' + port}));
});

gulp.task('serve', ['webserver', 'watch', 'open']);

gulp.task('watch', function () {
  process.env.IGNORE_ERROR = true;
  gulp.watch(files.src, ['build']);
});

gulp.task('webserver', function () {
  return gulp.src('dist')
    .pipe(plugins.webserver({
      port: port,
      livereload: true
    }));
});
