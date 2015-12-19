var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('lint', function() {
  return gulp.src([
      './resources/assets/**/*.js',
      './resources/tasks/**/*.js',
      './gulpfile.js'])
    .pipe($.jscs())
    .pipe($.jscs.reporter('jscs-stylish'));
});
