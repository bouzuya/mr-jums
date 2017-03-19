var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

module.exports = [
  {
    name: 'client',
    target: 'web',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    entry: {
      app: [
        path.join(__dirname, '.tmp/es2015/src/client/index.js')
      ]
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '/scripts/index.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
];
