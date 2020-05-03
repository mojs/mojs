'use strict';

const pack = require('./package.json');
const path = require('path');
const webpack = require('webpack');

module.exports = (argv) => ({
  entry: './src/mojs.babel.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'mojs',
    libraryExport: 'default',
    libraryTarget: 'umd',
    umdNamedDefine: true
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
      }
    }, {
      test: /\.coffee$/,
      use: {
        loader: 'coffee-loader',
        options: {
          bare: true
        }
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      build: {
        revision: `"${pack.version}"`
      }
    })
  ]
});
