import gulp from 'gulp';
import gutil from 'gulp-util';
import {run, statConfig} from './helper/bundler';

gulp.task('js', ['lint'], () => {
  return run()
    .then((stats) => {
      gutil.log('[webpack]', stats.toString(statConfig));
    })
    .catch((err) => {
      return new gutil.PluginError('[webpack]', err);
    });
});
