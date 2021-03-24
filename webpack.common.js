const bundle = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: [
      '.js',
      '.babel.js',
      '.coffee',
    ],
    alias: {
      root: __dirname,
      src: 'root/src/',
      delta: 'src/delta',
      easing: 'src/easing',
      shapes: 'src/shapes',
      tween: 'src/tween',
      vendor: 'src/vendor',
    },
  },
  module: {
    rules: [{
      test: /\.(babel.js)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    }, {
      test: /\.coffee$/,
      use: {
        loader: 'coffee-loader',
        options: {
          bare: true,
        },
      },
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      build: {
        revision: `"${bundle.version}"`,
        mode: `"${env.mode}"`,
      },
    }),
    new ESLintPlugin({
      cache: true,
      fix: true,
    }),
  ],
});
