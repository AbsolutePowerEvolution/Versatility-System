var gulp = require('gulp');
var reload = require('browser-sync').reload;

gulp.task('watch', function() {
  gulp.watch('./resources/assets/**/*.js', ['js'])
    .on('change', reload);
  gulp.watch('./resources/assets/**/*.scss', ['sass'])
    .on('change', reload);
});
