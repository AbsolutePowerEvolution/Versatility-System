var webpack = require('webpack');

module.exports = {
  entry: {
    'bundle': './resources/assets/javascript/main.js',
    'vendors': [
      'jquery',
      'mustache',
      'materialize-css/dist/js/materialize',
      'sammy',
      'sammy/lib/plugins/sammy.mustache'
    ]
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
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery'
    })
  ]
};
