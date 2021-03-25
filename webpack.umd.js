const bundle = require('./package.json');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

// build preamble
const preamble = `/*!\n  ${bundle.name} – ${bundle.description}\n  ${bundle.author.name} ${bundle.author.github} ${new Date().getFullYear()} ${bundle.license}\n  ${bundle.version}\n*/`;

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
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
