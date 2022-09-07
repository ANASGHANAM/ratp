module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src/services', '<rootDir>/src/tools'],
  testRegex: '((\\.|/)(test))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  coverageDirectory: 'build/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/index.ts',
    '!src/tests/**/*.ts',
    '!src/controllers/**/*.ts',
    '!src/tools/healthcheck/**/*.ts',
    '!src/clear/**/*.ts',
    '!src/**/*.d.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(test)\.ts$/,
      },
      tsconfig: 'tsconfig.dev.json',
    },
  },
};
