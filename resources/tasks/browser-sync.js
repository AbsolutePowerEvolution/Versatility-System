var gulp = require('gulp');
var browserSync = require('./helper/browser-sync');

gulp.task('serve', ['build', 'watch'], function() {
  browserSync.init({
    proxy: {
      target: 'localhost:8000'
    }
  });
});
