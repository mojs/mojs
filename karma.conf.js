const customLaunchers = require('./build-helpers/karma-helpers/saucelabs-browsers');
const { SAUCE_USERNAME, SAUCE_ACCESS_KEY } = process.env;

const isSauceLabs = SAUCE_USERNAME && SAUCE_ACCESS_KEY;

var browsers = [];
module.exports = function(config) {

  if (isSauceLabs) {
    reporters = ['dots', 'coverage', 'clear-screen', 'saucelabs'];
    browsers = Object.keys(customLaunchers);
  } else {
    reporters = ['progress', 'coverage', 'clear-screen'];
    browsers = ['Chrome'];
  }

  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'build/mo.js',
      'spec/**/*.spec.js'
    ],
    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'coverage/'
        },
        {
          type: 'text-summary'
        },
        {
          type: 'lcov',
          dir:  'coverage/',
          subdir: 'lcov-report'
        }
      ],
    },
    // test results reporter to use
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: false,
    // level of logging
    // possible values:
    //  - config.[LOG_DISABLE|LOG_ERROR|LOG_WARN|LOG_INFO|LOG_DEBUG]
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'mo·js@2 tests'
    },
    captureTimeout: 50000,
    customLaunchers,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true
  });
};
