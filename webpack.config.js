var path = require('path');
var webpack = require('webpack');

module.exports = {
  watch: true,
  context: __dirname + "/",
  entry: [
    __dirname + '/js/mojs.babel.js'
  ],
  module: {
    loaders: [
      { test: /\.(babel.js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015-loose', 'babel-preset-stage-2' ],
          plugins: [ 'transform-runtime' ]
        }
      },

      { test: /\.coffee$/, exclude: /node_modules/, loaders: ['coffee-loader?bare=true'] },
      { test: /\.cjsx$/, loaders: ['coffee', 'cjsx']},
      { test: /\.jade$/, loaders: ['jade'] },
      { test: /\.styl$/, loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 4 version!stylus-loader?paths=node_modules/' },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.(eot|woff|ttf|svg|png|jpg|wav|mp3)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
        // paths: ['/app/css/i/']
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
    root: [ path.resolve('./'), path.resolve('./css/') ],
    moduleDirectories: ['node_modules'],
    target: 'node',
    extensions: [
      '', '.js', '.es6', '.babel.js', '.coffee',
      '.styl', 
    ]
  }
};
