
module.exports = {
  watch: true,
  entry: [
    __dirname + '/js/app.jsx'
  ],
  module: {
    loaders: [
      { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['6to5-loader?optional=coreAliasing'] },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/' }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6', '.styl']
  }
};
