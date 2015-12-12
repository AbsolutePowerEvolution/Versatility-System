var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

var statsOptions = {
  colors: gutil.colors.supportsColor,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false
};

gulp.task('js', ['lint'], function() {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString(statsOptions));
  });
});
