var path = require('path');
var webpack = require('webpack');
var SplitByPathPlugin = require('webpack-split-by-path');
var env = process.env.NODE_ENV || 'development';

configs = {
  entry: {
    'bundle': './resources/assets/javascript/main.js'
  },
  output: {
    filename: '[name].js',
    path: 'public'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0']
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
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
  ]
};

module.exports = configs;
if(env === 'development' || env === 'production') {
  configs.externals = [{
    jquery: 'jQuery',
    'materialize-css/dist/js/materialize': 'null',
    sammy: 'Sammy',
    mustache: 'Mustache'
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

