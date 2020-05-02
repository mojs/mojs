'use strict';

const merge = require('webpack-merge');

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  watch: true,
  output: {
    filename: 'mo.js'
  }
});
