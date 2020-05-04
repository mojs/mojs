process.env.CHROME_BIN = require('puppeteer').executablePath();

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
    // browsers = ['PhantomJS'];
    // browsers = ['FirefoxHeadless'];
    browsers = ['ChromeHeadless'];
  } else {
    reporters = ['dots', 'coverage', 'clear-screen', 'saucelabs'];
    browsers = Object.keys(customLaunchers);
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        "spec_dir": "spec",
        "spec_files": [
          "**/*.js"
        ],
        "helpers": [
          "dist/mo.js"
        ],
        random: false,
        failFast: true
      }
    },
    files: [
      'dist/mo.js',
      'spec/**/*.coffee'
    ],
    exclude: [
      'spec/motion-path.coffee'
    ],
    preprocessors: {
      'spec/**/*.coffee': ['coffee']
    },
    coffeePreprocessor: {
      options: {
        bare: true,
        sourceMap: false
      },
      transformPath: function (path) {
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
    reporters: reporters,
    port: 9876,
    colors: true,
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
    autoWatch: true,
    browsers: browsers,
    singleRun: false,
    concurrency: Infinity
  });
};
