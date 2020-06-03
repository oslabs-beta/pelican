module.exports = {
  preset: 'ts-jest',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.test.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['<rootDir>/__tests__/setupTests.ts'],
  // collectCoverage: true,
  // collectCoverageFrom: ['**/*.{ts,tsx}', '!__tests__/api/api-test-helpers.ts'],
};
