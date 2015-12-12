var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('lint', function() {
  return gulp.src([
      './resources/assets/**/*.js',
      './resources/tasks/**/*.js',
      './gulpfile.js'])
    .pipe(jscs())
    .pipe(jscs.reporter('jscs-stylish'));
});
