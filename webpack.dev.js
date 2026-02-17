import path from 'node:path';
import common from './webpack.common.js';
import { merge } from 'webpack-merge';

export default async (env) => merge(common(env), {
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
      directory: path.resolve('dev'),
    },
    client: {
      logging: 'none',
      overlay: false,
    },
    open: true,
    historyApiFallback: true,
  },
});
