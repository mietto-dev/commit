/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "node",

  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts"],
  coverageDirectory: "../coverage",
  coveragePathIgnorePatterns: ["dist", "index.ts", "testing"],
  verbose: true,

  // greatly improves performance for unit tests
  maxWorkers: 1,
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.json",
    },
  },
}
