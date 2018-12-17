var webpack = require('webpack');
var path = require('path');

var port = 3001;

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        use: ['source-map-loader'],
        test: /\.js$/,
        enforce: 'pre'
      },
      {
        exclude: /node_modules/,
        test: /\.js$ /,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  entry: path.join(__dirname, '.tmp/es2015/src/client/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/scripts/',
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
