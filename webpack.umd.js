const pack = require('./package.json');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

// build preamble
const preamble = `/*!\n  ${pack.name} – ${pack.description}\n  ${pack.author.name} ${pack.author.github} ${new Date().getFullYear()} ${pack.license}\n  ${pack.version}\n*/`;

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'production',
  watch: false,
  output: {
    filename: 'mo.umd.js',
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
        },
      }),
    ],
  },
});
