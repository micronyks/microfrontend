const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: "http://localhost:9000",
    // login:"admin",
    // password:"admin@123",
   // token: "150a0c96a31cd5140cce83c25bf39aa8b6317f3b",
   token:"sqa_937dee3f939e728d5d235be4d6811ec7d7b47c60",
    options: {
      "sonar.sources": "./src/components",
      "sonar.exclusions": "**/*.test.tsx, **/dist/**/*, **/dist-docker-images/**/*,  **/public/**/*, **/script/**/*, **/Dockerfile.dev, **/Dockerfile.prod, **/nginx.conf, **/package-json, **/package-lock.json, **/sonarqube.scanner.js, **/webpack.config.js, **/webpack.docker.js, **/webpack.prod.js ",
      // "sonar.tests": "./src",
      // "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts",
      // "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      // "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => process.exit()
);