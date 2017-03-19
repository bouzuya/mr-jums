var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var port = 3001;

module.exports = {
  name: 'client',
  target: 'web',
  module: {
    rules: [
      { use: ['source-map-loader'], test: /\.js$/, enforce: 'pre' }
    ],
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
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, '.tmp/es2015/src/client/index.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicDir: '/scripts/',
    filename: 'index.js'
  },
  devServer: {
    hot: true,
    port: port,
    contentBase: './public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
