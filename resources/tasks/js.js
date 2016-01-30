import gulp from 'gulp';
import gutil from 'gulp-util';
import bundler from './helper/bundler';

gulp.task('js', ['lint'], () => {
  return bundler.run()
    .then((stats) => {
      gutil.log('[webpack]', stats.toString(bundler.statConfig));
    })
    .catch((err) => {
      return new gutil.PluginError('[webpack]', err);
    });
});
