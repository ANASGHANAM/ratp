module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/tests'],
  testRegex: '((\\.|/)(test))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testEnvironment: '<rootDir>/src/tests/jest.integration.environment.ts',
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  coverageDirectory: 'build/coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(test)\.ts$/,
      },
      tsconfig: 'tsconfig.dev.json',
    },
  },
  globalSetup: './src/tests/jest.global.setup.ts', // will be called once before all tests are executed
  globalTeardown: './src/tests/jest.global.teardown.ts', // will be called once after all tests are executed
};
