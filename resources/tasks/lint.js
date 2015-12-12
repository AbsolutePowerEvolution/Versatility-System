var gulp = require('gulp');
var jscs = require('gulp-jscs');

gulp.task('lint', function() {
  return gulp.src([
      './resources/assets/**/*.js',
      './resources/tasks/**/*.js',
      './gulpfile.js'])
    .pipe(jscs({ fix: true }))
    .pipe(jscs.reporter('jscs-stylish'))
    .pipe(gulp.dest('./'));
});
