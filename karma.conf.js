process.env.CHROME_BIN = require('puppeteer').executablePath();

// Karma configuration
module.exports = function (config) {

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    sl_chrome_35: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_chrome_50: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '50'
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
      version: '38'
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
    },
    FirefoxHeadless: {
      base: 'Firefox',
      flags: ['-headless'],
    }
  };

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    reporters = ['progress', 'coverage', 'clear-screen'];
    // Here you can change to what browsers you have on your system. TODO: Move to .env file instead
    // Note: Puppetter currently doesn't work on WSL v1. Should work in WSL v2
    browsers = ['PhantomJS'];
    // browsers = ['FirefoxHeadless'];
    // browsers = ['ChromeHeadless'];
    
    // browsers = [];
  } else {
    reporters = ['dots', 'coverage', 'clear-screen', 'saucelabs'];
    browsers = Object.keys(customLaunchers);
  }


  config.set({
    basePath: '',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      // 'dist/**/*.js',
      'build/mo.js',
      'spec/**/*.coffee',
      // 'spec/burst.coffee',
      // 'spec/shapes/*.js'
    ],
    // list of files to exclude
    exclude: [
      // 'build/h.coffee',
      // 'spec/h.coffee',

      // 'build/delta/delta.coffee',
      // 'spec/delta/delta.coffee',
      // 'build/delta/deltas.coffee',
      // 'spec/delta/deltas.coffee',

      // 'build/html.coffee',
      // 'spec/html.coffee',

      // 'build/shape.coffee',
      // 'spec/shape.coffee',
      // 'build/shape-swirl.coffee',
      // 'spec/shape-swirl.coffee',
      // 'build/burst.coffee',
      // 'spec/burst.coffee',

      // 'build/module.coffee',
      // 'spec/module.coffee',
      // 'build/tween/tweenable.coffee',
      // 'spec/tween/tweenable.coffee',
      // 'build/tunable.coffee',
      // 'spec/tunable.coffee',
      // 'build/thenable.coffee',
      // 'spec/thenable.coffee',

      // 'build/spriter.coffee',
      // 'spec/spriter.coffee',
      // // 'build/stagger.coffee',
      // // 'spec/stagger.coffee',

      // 'build/easing/easing.coffee',
      // 'spec/easing/easing.coffee',

      // 'build/tween/timeline.coffee',
      // 'spec/tween/timeline.coffee',
      // 'build/tween/tween.coffee',
      // 'spec/tween/tween.coffee',
      // 'build/tween/tweener.coffee',
      // 'spec/tween/tweener.coffee',

      // 'build/motion-path.coffee',
      'spec/motion-path.coffee',
      // 'build/shapes/*.coffee',
      // 'spec/shapes/*.coffee'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.coffee': ['coffee']
    },

    coffeePreprocessor: {
      // options passed to the coffee compiler
      options: {
        bare: true,
        sourceMap: false
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js')
      }
    },
    // browserify: {
    //   debug: true,
    //   transform: [ 'brfs', istanbul({
    //     ignore: ['**/node_modules/**', '**/spec/**'],
    //   })]
    // },
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: 'lcov-report' }
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
      startConnect: false,
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
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
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
