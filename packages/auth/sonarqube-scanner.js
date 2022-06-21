const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "150a0c96a31cd5140cce83c25bf39aa8b6317f3b",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.tsx, **/dist/**/*, **/dist-docker-images/**/*,  **/public/**/*, **/script/**/*, **/Dockerfile.dev, **/Dockerfile.prod, **/nginx.conf, **/package-json, **/package-lock.json, **/sonarqube.scanner.js, **/webpack.config.js, **/webpack.docker.js, **/webpack.prod.js ",
      // "sonar.tests": "./src",
      // "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
      // "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      // "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => process.exit()
);