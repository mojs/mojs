process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

  // browser testing configuration
  var customLaunchers = {
    bs_chrome_latest: {
      browser: 'chrome',
      os: 'Windows',
      os_version: '10',
    },
  };

  // define the base configuration for each launcher
  Object.keys(customLaunchers).map((key) => {
    customLaunchers[key].base = 'BrowserStack';
    customLaunchers[key].browser_version = 'latest';
  });

  // use appropriate reporter if running with GITHUB_ACTIONS
  if (process.env.GITHUB_ACTIONS) {
    reporters = ['BrowserStack', 'summary', 'coverage'];
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
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      video: false
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    autoWatch: true,
    browsers: browsers,
    singleRun: true,
    concurrency: 5
  });
};
