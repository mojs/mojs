const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  devtool: 'source-map',
  entry: './dev/index.js',
  output: {
    filename: 'dev.js',
  },
  devServer: {
    contentBase: [
      path.join(__dirname, '/dev'),
      path.join(__dirname, '/dist'),
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true,
  },
});
