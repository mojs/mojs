process.env.CHROME_BIN = require('puppeteer').executablePath();
let bundle = require('./package.json');

module.exports = (config) => {

  // use appropriate reporter if running with GITHUB_ACTIONS
  let customLaunchers, reporters, browsers;

  // run tests against browsers on Github Actions, ChromeHeadless instead
  if (process.env.GITHUB_ACTIONS) {
    customLaunchers = {
      bs_chrome_latest: {
        browser: 'chrome',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '11',
      },
      bs_firefox_latest: {
        browser: 'firefox',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '11',
      },
      bs_edge_latest: {
        browser: 'edge',
        browser_version: '110.0',
        os: 'Windows',
        os_version: '11',
      },
      bs_safari_latest: {
        browser: 'safari',
        browser_version: '14.1',
        os: 'OS X',
        os_version: 'Big Sur',
      },
      bs_iphone_latest: {
        device: 'iPhone 12',
        browser_version: 'latest',
        os: 'iOS',
        os_version: '14',
      },
    };

    // define the base configuration for each launcher
    Object.keys(customLaunchers).map((key) => {
      customLaunchers[key].base = 'BrowserStack';
    });

    reporters = ['BrowserStack', 'summary', 'coverage'];
  } else {
    customLaunchers = {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--single-process',
        ],
      },
    };

    reporters = ['progress', 'coverage'];
  }

  // build a list of browsers to run the test
  browsers = Object.keys(customLaunchers);

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    client: {
      jasmine: {
        'spec_dir': 'spec',
        'spec_files': [
          '**/*.js',
        ],
        random: false,
      },
    },
    files: [
      'dist/mo.umd.js',
      'spec/**/*.coffee',
    ],
    exclude: [
      'spec/motion-path.coffee',
    ],
    preprocessors: {
      'spec/**/*.coffee': [
        'coffee',
        'coverage',
      ],
    },
    coffeePreprocessor: {
      options: {
        bare: true,
        sourceMap: false,
      },
      transformPath: (path) => {
        return path.replace(/\.coffee$/, '.js');
      },
    },
    summaryReporter: {
      show: 'failed',
      specLength: 50,
      overviewColumn: true,
    },
    coverageReporter: {
      reporters: [
        {
          type: 'html',
          dir: 'coverage/',
        }, {
          type: 'text-summary',
        }, {
          type: 'lcov',
          subdir: '/',
        },
      ],
    },
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browserStack: {
      username: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      video: false,
      build: `@mojs/core ${bundle.version}`,
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    autoWatch: true,
    browsers: browsers,
    singleRun: true,
    concurrency: 1,
  });
};
