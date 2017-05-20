const path = require('path');
const webpack = require('webpack');

const root = path.resolve('./');

module.exports = {
  devtool: 'source-map',
  watch: true,
  context: __dirname + "/",
  entry: [ __dirname + '/src/mojs.babel.js' ],
  module: {
    rules: [
      { test: /\.(babel.js)$/,
        loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/,
        include: root
      }
    ]
  },
  output: {
    path:             __dirname + '/build',
    filename:         'mo.js',
    publicPath:       'build/',
    library:          'mojs',
    libraryTarget:    'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: true,
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "production"
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.babel.js' ]
  }
};
