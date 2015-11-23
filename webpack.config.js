var path = require('path');
var webpack = require('webpack');
var plugins = [];

var minimize = process.argv.indexOf('--minimize') === -1 ? false : true;
console.log(minimize)

var outputFileName = 'mo.js'
if (minimize) {
  plugins.push( new webpack.optimize.UglifyJsPlugin );
  outputFileName = 'mo.min.js';
}

module.exports = {
  watch: true,
  context: __dirname + "/",
  entry: [
    __dirname + '/js/mojs.coffee'
  ],
  module: {
    loaders: [
      { test: /\.(jsx|es6.js)$/, exclude: /node_modules/, loaders: ['6to5-loader?optional=coreAliasing'] },
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
    path:         __dirname + '/dist',
    filename:     outputFileName,
    publicPath:   'dist/'
  },
  plugins: plugins,
  resolve: {
    root: [ path.resolve('./'), path.resolve('./css/') ],
    moduleDirectories: ['node_modules'],
    target: 'node',
    extensions: [
      '', '.js', '.jsx', '.es6',
      '.styl',   '.jade',
      '.coffee', '.cjsx',
      '.html',
    ]
  }
};
