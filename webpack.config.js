var path = require('path');
var webpack = require('webpack');
var SplitByPathPlugin = require('webpack-split-by-path');

module.exports = {
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
