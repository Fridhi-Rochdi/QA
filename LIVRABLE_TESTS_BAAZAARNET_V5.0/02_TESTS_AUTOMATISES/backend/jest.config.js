module.exports = {
  testEnvironment: 'node',
  testTimeout: 20000,
  setupFilesAfterEnv: ['./tests/setup.js'],
  verbose: true,
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "Rapport de Test Backend BazaarNet",
      "outputPath": "../../03_RAPPORTS_EXECUTION/jest-report.html"
    }]
  ]
};
