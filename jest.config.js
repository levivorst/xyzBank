module.exports={
    testMatch: [
        "**/*.test.js"
      ],
      globals: {
        "page": true,
        "browser": true,
        "context": true,
        "jestPuppeteer": true
    },
    testTimeout : 40000
}