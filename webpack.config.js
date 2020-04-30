'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './js/mojs.babel.js',
  output: {
    filename: 'mo.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'build/',
    library: 'mojs',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  resolve: {
    extensions: [
      '.js',
      '.babel.js',
      '.coffee'
    ]
  },
  module: {
    rules: [{
      test: /\.(babel.js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-object-rest-spread'
          ]
        }
      },
      exclude: /node_modules/
    }, {
      test: /\.coffee$/,
      use: {
        loader: 'coffee-loader',
        options: {
          bare: true
        }
      },
      exclude: /node_modules/
    }]
  }
};
