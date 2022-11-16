module.exports = {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testEnvironment: "node",
  coverageReporters: ["json-summary"],
  testMatch: ["**/*.unit.test.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/lib/"],
  modulePathIgnorePatterns: ["/dist/"],
  clearMocks: true,
  rootDir: "src",
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
};
