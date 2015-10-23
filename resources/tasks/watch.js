var gulp = require('gulp');
var reload = require('browser-sync').reload;

gulp.task('watch', function() {
  gulp.watch('./resources/assets/**/*.js', ['build'])
    .on('change', reload);
});
