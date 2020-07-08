'use strict';

const path = require('path');
const { merge } = require('webpack-merge');
const CreateFileWebpack = require('create-file-webpack');

const template = `'use strict';

// get the current mojs version
document.querySelector('.mojs-version').innerHTML += ' ' + mojs.revision;

// build the tween
const burst = new mojs.Burst({
  radius: { 1 : 200 },
  count: 20,
  children: {
    radius: 'rand(20, 10)',
    delay: 'rand(0, 500)',
    duration: 2000,
    opacity: 'rand(0.1, 1)'
  }
});

// build the timeline and add the tween
const timeline = new mojs.Timeline().add(
  burst
);

// build the player and add the timeline
new MojsPlayer({
  add: timeline,
  isSaveState: true,
  isPlaying: true,
  isRepeat: true
});`;

module.exports = (argv) => merge(require('./webpack.common.js')(argv), {
  mode: 'development',
  output: {
    filename: 'mo.js'
  },
  plugins: [
    new CreateFileWebpack({
      path: './dev/',
      fileName: 'script.js',
      content: template
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '/dev'),
      path.join(__dirname, '/dist')
    ],
    watchContentBase: true,
    compress: true,
    port: 9000,
    open: true
  }
});
