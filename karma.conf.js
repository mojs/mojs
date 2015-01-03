var istanbul = require('browserify-istanbul');
// Karma configuration
// Generated on Sun Dec 07 2014 13:58:11 GMT+0200 (EET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'dist/**/*.js',
      'spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      'dist/mojs.js',
      'dist/mojs.min.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // 'spec/*.js': 'coverage',
        'dist/*.js': ['browserify']
    },

    onRunStart: function() {
        console.log("\u001b[2J\u001b[0;0H");
    },

    browserify: {
      debug: true,
      transform: [ 'brfs', istanbul({
        ignore: ['**/node_modules/**', '**/spec/**'],
      })]
    },

    coverageReporter: {
        reporters:[
          {type: 'html', dir:'coverage/'},
          // {type: 'teamcity'},
          {type: 'text-summary'}
          // {type: 'coverage'},
          // {type: 'growl'}
        ],
      },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'clear-screen'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
