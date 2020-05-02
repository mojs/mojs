'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'production',
  watch: false,
  output: {
    filename: 'mo.umd.js',
    publicPath: 'dist/',
    library: 'mojs',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
});
