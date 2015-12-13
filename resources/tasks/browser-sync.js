var gulp = require('gulp');
var bg = require('gulp-bg');
var browserSync = require('./helper/browser-sync');

gulp.task('php-server', bg('php', 'artisan', 'serve'));

gulp.task('proxy', ['build', 'watch', 'php-server'], function() {
  browserSync.init({
    proxy: {
      target: 'localhost:8000'
    },
    files: [
      'public/**/*.css',
      'public/**/*.js'
    ]
  });
});

gulp.task('serve', ['proxy']);
