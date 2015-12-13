var gulp = require('gulp');
var gutil = require('gulp-util');
var bundler = require('./helper/bundler');

gulp.task('js', ['lint'], function() {
  return bundler.run()
    .then(function(stats) {
      gutil.log('[webpack]', stats.toString(bundler.statConfig));
    })
    .catch(function(err) {
      return new gutil.PluginError('[webpack]', err);
    });
});
