process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    sl_chrome_49: {
      browserName: 'chrome',
      version: '49'
    },
    sl_firefox_70: {
      browserName: 'firefox',
      version: '70'
    },
    sl_safari_8: {
      browserName: 'safari',
      version: '8'
    },
    sl_chrome_latest: {
      browserName: 'chrome',
      version: 'latest'
    },
    sl_firefox_latest: {
      browserName: 'firefox',
      version: 'latest'
    },
    sl_safari_latest: {
      browserName: 'safari',
      version: 'latest',
      platformName: 'macOS 10.15'
    },
    sl_edge_latest: {
      browserName: 'MicrosoftEdge',
      version: 'latest'
    },
    sl_ios_latest: {
      browserName: 'Safari',
      platform: 'iOS',
      version: 'latest',
      device: 'iPhone Simulator'
    }
  };

  // define the base configuration for each launcher
  Object.keys(customLaunchers).map((key) => {
    customLaunchers[key].base = 'SauceLabs';
  });

  // use SauceLabs browsers if running with TravisCI
  if (process.env.TRAVIS) {
    reporters = ['coverage', 'clear-screen', 'saucelabs'];
    browsers = Object.keys(customLaunchers);
  } else {
    // Here you can change to what browsers you have on your system. TODO: Move to .env file instead
    // Note: Puppetter currently doesn't work on WSL v1. Should work in WSL v2
    reporters = ['progress', 'coverage'];
    browsers = ['ChromeHeadless'];
  }

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        'spec_dir': 'spec',
        'spec_files': [
          '**/*.js'
        ],
        'helpers': [
          'dist/mo.js'
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
      'dist/mo.js': ['coverage'],
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
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/' },
        { type: 'text-summary' },
        { type: 'lcov', subdir: '/' }
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
      recordScreenshots: false,
      recordVideo: false
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    autoWatch: true,
    browsers: browsers,
    singleRun: true,
    concurrency: Infinity
  });
};
