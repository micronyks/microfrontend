const scanner = require('sonarqube-scanner');

 const testExclusions = `./src/**/*.d.ts,
                        ./src/setupTests.ts
                        ./src/reportWebVitals.ts, 
                        ./src/index.ts,
                        ./src/index.js,
                        ./src/bootstrap.ts,
                        ./src/bootstrap.js,
                        ./src/core/constants/**/*,
                        ./src/core/interfaces/**/*,
                        ./src/core/store/**/*`;
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqa_54a2bae6783586df106802c3ddde41ff3905362d",
    options: {
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.tsx, **/dist/**/*, **/dist-docker-images/**/*,  **/public/**/*, **/script/**/*, **/Dockerfile.dev, **/Dockerfile.prod, **/nginx.conf, **/package-json, **/package-lock.json, **/sonarqube.scanner.js, **/webpack.config.js, **/webpack.docker.js, **/webpack.prod.js ",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.tsx,**/*.test.ts,**/*.test.js",
      "sonar.coverage.exclusions": `${testExclusions}`,
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "test-report.xml"
    },
  },
  () => process.exit()
);