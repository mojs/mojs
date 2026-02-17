import bundle from './package.json' with { type: 'json' };
import common from './webpack.common.js';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

// build preamble
const preamble = `/*!\n  ${bundle.name} – ${bundle.description}\n  ${bundle.author.name} ${bundle.author.github} ${new Date().getFullYear()} ${bundle.license}\n  ${bundle.version}\n*/`;

export default async (env) => merge(common(env), {
  mode: 'production',
  watch: false,
  entry: './src/mojs.babel.js',
  output: {
    filename: 'mo.umd.js',
    library: {
      name: 'mojs',
      type: 'umd',
      export: 'default',
      umdNamedDefine: true,
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
            preamble: preamble,
          },
          toplevel: true,
        },
      }),
    ],
  },
});
