const path = require('path');

const root = path.resolve('./');

module.exports = {
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
    libraryTarget:    'umd',
    umdNamedDefine:   true
  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: [ '.babel.js' ]
  }
};
