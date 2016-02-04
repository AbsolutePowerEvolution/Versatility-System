var path = require('path');
var webpack = require('webpack');
var SplitByPathPlugin = require('webpack-split-by-path');
var env = process.env.NODE_ENV || 'development';

var getDefaultConfigs = function() {
  return {
    entry: {
      'bundle': './resources/assets/javascript/main.js'
    },
    output: {
      filename: '[name].js',
      path: 'public/assets/js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel!jscs',
        exclude: /node_modules/,
      }, {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }, {
        test: /\.vue$/,
        loader: 'vue'
      }]
    },
    vue: {
      js: {
        loaders: 'babel!jscs'
      }
    },
    plugins: [
      new SplitByPathPlugin([{
        name: 'vendors',
        path: path.join(__dirname, 'node_modules/')
      }]),
      new webpack.ProvidePlugin({
        'jQuery': 'jquery',
        '$': 'jquery'
      })
    ],
  };
};

var getConfigs = function(env) {
  env = env || 'development';

  var configs = getDefaultConfigs();

  if(env === 'development' || env === 'production') {
    configs.externals = [{
      jquery: 'jQuery',
      'materialize-css/dist/js/materialize': 'null',
      sammy: 'Sammy',
      lodash: '_',
      hogan: 'Hogan',
      moment: 'moment',
      pikaday: 'Pikaday',
      vue: 'Vue',
      'vue-resource': 'VueResource',
      'vue-validator': 'window[\'vue-validator\']'
    }];

    if(env === 'production') {
      configs.plugins.push(
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
      );
    }
  }
  return configs;
};

var configs = getConfigs(env);
module.exports = configs;
configs.getConfigs = getConfigs;
