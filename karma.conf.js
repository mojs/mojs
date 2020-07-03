process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

  // Browsers to run on Sauce Labs
  // Check out https://saucelabs.com/platforms for all browser/OS combos
  var customLaunchers = {
    sl_chrome_latest: {
      browserName: 'chrome',
      platformName: 'Windows 10'
    },
    sl_firefox_latest: {
      browserName: 'firefox',
      platformName: 'Windows 10'
    },
    sl_edge_latest: {
      browserName: 'MicrosoftEdge',
      platformName: 'Windows 10'
    },
    sl_safari_latest: {
      browserName: 'safari',
      platformName: 'macOS 10.15'
    }
  };

  // define the base configuration for each launcher
  Object.keys(customLaunchers).map((key) => {
    customLaunchers[key].base = 'SauceLabs';
    customLaunchers[key].browserVersion = 'latest';
  });

  // use SauceLabs browsers if running with TravisCI
  if (process.env.TRAVIS) {
    reporters = ['saucelabs', 'summary', 'coverage'];
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
        random: false,
        failFast: true
      }
    },
    files: [
      'dist/mo.umd.js',
      'spec/**/*.coffee'
    ],
    exclude: [
      'spec/motion-path.coffee'
    ],
    preprocessors: {
      'spec/**/*.coffee': [
        'coffee',
        'coverage'
      ]
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
    summaryReporter: {
       show: 'failed',
       specLength: 50,
       overviewColumn: true
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
      region: 'us',
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
    concurrency: 5
  });
};
