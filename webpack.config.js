var path = require('path');

module.exports = [
  {
    mode: 'production',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    entry: path.join(__dirname, '.tmp/es2015/src/client/index.js'),
    optimization: {
      minimize: true
    },
    output: {
      path: path.join(__dirname, 'public', 'scripts'),
      filename: 'index.js'
    }
  }
];
