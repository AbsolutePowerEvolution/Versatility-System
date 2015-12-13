var webpack = require('webpack');
var when = require('when');
var chalk = require('chalk');
var webpackConfig = require('../../../webpack.config.js');

var bundler = webpack(webpackConfig);

exports.bundler = bundler;

exports.statConfig = {
  colors: chalk.supportsColor,
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

exports.watch = function() {
  return new when.Promise(function(resolve, reject) {
    bundler.watch(200, function(err, stats) {
      if(err) {
        return reject(err);
      } else {
        return resolve(stats);
      }
    });
  });
};

exports.run = function() {
  return new when.Promise(function(resolve, reject) {
    bundler.run(function(err, stats) {
      if(err) {
        return reject(err);
      } else {
        return resolve(stats);
      }
    });
  });
};
