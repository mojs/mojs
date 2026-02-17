import bundle from './package.json' with { type: 'json' };
import path from 'node:path';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';

export default (env) => {
  return {
    output: {
      path: path.resolve('dist'),
      clean: true,
    },
    resolve: {
      extensions: [
        '.js',
        '.babel.js',
        '.coffee',
      ],
      alias: {
        root: path.resolve(),
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
            presets: [
              [
                '@babel/preset-env', {
                  bugfixes: true,
                },
              ],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
            ],
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
  };
};
