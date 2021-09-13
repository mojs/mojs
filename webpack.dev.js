const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  devtool: 'source-map',
  entry: './dev/index.js',
  output: {
    filename: 'dev.js',
  },
  devServer: {
    port: 9000,
    static: {
      serveIndex: false,
      directory: path.join(__dirname, 'dev'),
    },
    client: {
      logging: 'none',
      overlay: false,
    },
    open: true,
    historyApiFallback: true,
  },
});
