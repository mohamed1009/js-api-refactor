/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', { useEsm: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/src/',
    '<rootDir>/build/',
    '<rootDir>/src/*.js',
  ],
  transformIgnorePatterns: ['test/fixtures/*.xml'],
};
