import webpack from 'webpack';
import when from 'when';
import chalk from 'chalk';
import webpackConfig from '../../../webpack.config.js';

export let bundler = webpack(webpackConfig);

export var statConfig = {
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

export function watch() {
  return when.promise((resolve, reject) => {
    bundler.watch(200, (err, stats) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(stats);
      }
    });
  });
};

export function run() {
  return when.promise((resolve, reject) => {
    bundler.run((err, stats) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(stats);
      }
    });
  });
};
