var istanbul = require('browserify-istanbul');
// Karma configuration

module.exports = function(config) {

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    sl_chrome_26: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows XP',
      version: '26'
    },
    sl_chrome_35: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.8',
      version: '6'
    },
    sl_firefox_30: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_firefox_4: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '4'
    },
    // sl_ios_safari: {
    //   base: 'SauceLabs',
    //   browserName: 'iphone',
    //   platform: 'OS X 10.9',
    //   version: '7.1'
    // },
    sl_ie_9: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    // sl_ie_10: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 8',
    //   version: '10'
    // },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
   
  };

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      reporters = ['progress', 'coverage', 'clear-screen'];
      browsers = ['PhantomJS'];
      // browsers = [];
  } else {
      reporters = ['dots', 'coverage', 'clear-screen', 'saucelabs'];
      browsers = Object.keys(customLaunchers);
  }


  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],
    // list of files / patterns to load in the browser
    files: [
      'spec/mo.spec.js',
      // 'dist/**/*.js',
      'spec/**/*.js'
      // 'dist/mo.js',
      // 'dist/transit.js',
      // 'spec/transit.js',
    ],
    // list of files to exclude
    exclude: [
      // 'js/mo.js',
      // 'dist/mo.js',
      // 'dist/mojs.js',
      // 'dist/h.js',
      // 'spec/h.js',
      // 'dist/transit.js',
      // 'spec/transit.js',
      // 'dist/swirl.js',
      // 'spec/swirl.js',
      // 'dist/spriter.js',
      // 'spec/spriter.js',
      // 'dist/stagger.js',
      // 'spec/stagger.js',
      // // 'dist/tween.js',
      // // 'spec/tween.js',
      // 'dist/burst.js',
      // 'spec/burst.js',
      // // 'dist/timeline.js',
      // // 'spec/timeline.js',
      // 'dist/motion-path.js',
      // 'spec/motion-path.js',
      // 'dist/tweener.js',
      // 'spec/tweener.js',
      // 'dist/bits/*.js',
      // 'spec/bits/*.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'spec/mo.spec.js': 'coverage',
        // 'dist/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [ 'brfs', istanbul({
        ignore: ['**/node_modules/**', '**/spec/**', '**/vendor/**'],
      })]
    },
    coverageReporter: {
      reporters:[
        {type: 'html', dir:'coverage/'},
        // {type: 'teamcity'},
        {type: 'text-summary'},
        // {type: 'coverage'},
        // {type: 'growl'}
        {type: 'lcov', subdir: 'lcov-report'}
      ],
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    sauceLabs: {
      testName: 'mo · js tests',
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['PhantomJS'],
    browsers: browsers,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
