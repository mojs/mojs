'use strict';

const path = require('path');
const merge = require('webpack-merge');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  output: {
    filename: 'mo.js'
  },
  devServer: {
    contentBase: [
      path.join(__dirname, '/dev'),
      path.join(__dirname, '/dist')
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true
  }
});
