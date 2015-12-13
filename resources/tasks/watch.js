var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch('./resources/assets/**/*.js', ['js']);
  gulp.watch('./resources/assets/**/*.scss', ['sass']);
});
