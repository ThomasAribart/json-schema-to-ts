module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  testTimeout: 20000,
  roots: ["<rootDir>"],
  testMatch: ["**/*.unit.test.ts"],
  testPathIgnorePatterns: ["/node_modules/"],
  clearMocks: true,
  testEnvironment: "node",
  roots: ["<rootDir>"],
};
