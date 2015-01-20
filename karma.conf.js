var istanbul = require('browserify-istanbul');
// Karma configuration
// Generated on Sun Dec 07 2014 13:58:11 GMT+0200 (EET)

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
    sl_ie_10: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8',
      version: '10'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
    // // sl_chrome_26: {
    // //   base: 'SauceLabs',
    // //   browserName: 'chrome',
    // //   platform: 'Windows XP',
    // //   version: '26'
    // // },

    // sl_chrome_35: {
    //   base: 'SauceLabs',
    //   browserName: 'chrome',
    //   platform: 'Windows 7',
    //   version: '35'
    // },

    // sl_safari_6: {
    //   base: 'SauceLabs',
    //   browserName: 'safari',
    //   platform: 'OS X 10.8',
    //   version: '6'
    // },
    // // sl_safari_7: {
    // //   base: 'SauceLabs',
    // //   browserName: 'safari',
    // //   platform: 'OS X 10.9',
    // //   version: '7'
    // // },
    // // sl_safari_8: {
    // //   base: 'SauceLabs',
    // //   browserName: 'safari',
    // //   platform: 'OS X 10.10',
    // //   version: '8'
    // // },

    // // sl_ios_safari_71: {
    // //   base: 'SauceLabs',
    // //   browserName: 'iphone',
    // //   platform: 'OS X 10.9',
    // //   version: '7.1'
    // // },
    // // sl_ios_safari_8: {
    // //   base: 'SauceLabs',
    // //   browserName: 'iphone',
    // //   platform: 'OS X 10.9',
    // //   version: '8'
    // // },
    // sl_ios_safari_81: {
    //   base: 'SauceLabs',
    //   browserName: 'ipad',
    //   platform: 'OS X 10.9',
    //   version: '8.1'
    // },

    // // sl_firefox_4: {
    // //   base: 'SauceLabs',
    // //   browserName: 'firefox',
    // //   version: '4'
    // // },
    // sl_firefox_33: {
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    //   version: '33'
    // },

    // // sl_opera: {
    // //   base: 'SauceLabs',
    // //   browserName: 'opera',
    // //   platform: 'Windows 7',
    // //   version: '12'
    // // },

    // // sl_android: {
    // //   base: 'SauceLabs',
    // //   browserName: 'android',
    // //   platform: 'linux',
    // //   version: '4.4'
    // // },

    // sl_ie_9: {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 7',
    //   version: '9'
    // }
    // // sl_ie_10: {
    // //   base: 'SauceLabs',
    // //   browserName: 'internet explorer',
    // //   platform: 'Windows 8',
    // //   version: '10'
    // // },
    // // sl_ie_11: {
    // //   base: 'SauceLabs',
    // //   browserName: 'internet explorer',
    // //   platform: 'Windows 8.1',
    // //   version: '11'
    // // }



    
  };

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
      console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
      // process.exit(1);
      reporters = ['progress', 'coverage', 'clear-screen'];
      browsers = ['PhantomJS'];      
    } else {
      reporters = ['progress', 'coverage', 'clear-screen', 'saucelabs'];
      browsers = Object.keys(customLaunchers);
    }

  config.set({


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
      // 'dist/bit.js',
      // 'spec/bit.js',
      // 'dist/line.js',
      // 'spec/line.js',
      // 'dist/cross.js',
      // 'spec/cross.js',
      // 'dist/polygon.js',
      // 'spec/polygon.js',
      // 'dist/rect.js',
      // 'spec/rect.js',
      // 'dist/transit.js',
      // 'spec/transit.js',
      // 'dist/h.js',
      // 'spec/h.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // 'spec/*.js': 'coverage',
        'dist/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [ 'brfs', istanbul({
        ignore: ['**/node_modules/**', '**/spec/**', '**/vendor/**'],
      })]
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
