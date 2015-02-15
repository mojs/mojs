var webpack = require('webpack');

module.exports = {

    watch: true,
    entry: [
        __dirname + '/js/app.jsx'
    ],
    module: {
        loaders: [
            { test: /\.(jsx|es6)$/, exclude: /node_modules/, loaders: ['6to5-loader?optional=coreAliasing'] },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/' }
        ],
        noParse: [__dirname + '/node_modules/react/dist/react-with-addons.min.js']
    },
    output: {
        path: __dirname + '/dist',
        filename: 'app.prod.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.es6', '.styl'],
        alias: {
            'react$': __dirname + '/node_modules/react/dist/react-with-addons.min.js',
            'react/addons$': __dirname + '/node_modules/react/dist/react-with-addons.min.js'
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
