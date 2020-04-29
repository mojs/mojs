'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  watch: true,
  entry: './js/mojs.babel.js',
  output: {
    filename: 'mo.js',
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    library: 'mojs',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [
      '.js',
      '.es6',
      '.babel.js',
      '.coffee',
      '.styl'
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
    }, {
      test: /\.cjsx$/,
      use: [
        'coffee',
        'cjsx'
      ]
    }, {
      test: /\.jade$/,
      use: 'jade'
    }, {
      test: /\.styl$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'autoprefixer-loader',
        options: {
          browsers: 'last 4 version'
        }
      }, {
        loader: 'stylus-loader',
        options: {
          paths: 'node_modules/'
        }
      }]
    }, {
      test: /\.html$/,
      use: 'raw-loader'
    }, {
      test: /\.(eot|woff|ttf|svg|png|jpg|wav|mp3)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 30000,
          name: '[name]-[hash].[ext]'
        }
      }
    }]
  }
};
