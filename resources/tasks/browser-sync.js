import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import browserSync from './helper/browser-sync';

let $ = loadPlugins();

gulp.task('php-server', $.bg('php', 'artisan', 'serve'));

gulp.task('proxy', ['build', 'watch', 'php-server'], () => {
  browserSync.init({
    proxy: {
      target: 'localhost:8000'
    },
    files: [
      'public/**/*.css',
      'public/**/*.js',
      'public/templates/**/*.ms'
    ]
  });
});

gulp.task('serve', ['proxy']);
