const { join } = require('path');

const chromeOptionsArgs = [
  // This value of font-render-hinting is to ensure that all text is rendered exactly in the
  // same way on headless as it does on "headful".
  '--font-render-hinting=slight',
  '--window-size=519,800',
];

let config = {
  maxInstances: 2,
  specs: [
    "./src/specs/*.ts"
  ],
  capabilities: [
  {
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: chromeOptionsArgs,
    },
  }],
  sync: true,
  coloredLogs: true,
  logLevel: "debug",
  waitforTimeout: 10000,
  connectionRetryTimeout: 75000,
  connectionRetryCount: 3,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 150000,
    require: [
      'tsconfig-paths/register',
    ],
  },
  reporters: ["spec"],
  reporterOptions: {
    writeStandardOutput: true
  },
  services: [
    ['image-comparison',
    // The options
      {
        // Some options, see the docs for more
        baselineFolder: join(process.cwd(), './visual-regression/reference'),
        formatImageName: '{tag}-{browserName}-{width}x{height}',
        screenshotPath: join(process.cwd(), './test-output/visual-regression'),
        savePerInstance: true,
        autoSaveBaseline: true,
        clearRuntimeFolder: true,
      }],
  ],
  before (capabilities, specs) {
    const chai = require("chai");
    const tsnode = require('ts-node');

    tsnode.register({ files: true });

    global.expect = chai.expect;
    chai.Should();
  }
};

exports.config = config;
