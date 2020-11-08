module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/*.test.js', '<rootDir>/src/**/*.spec.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: ['/node_modules/?!(react-native|native-base)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageDirectory: '<rootDir>/generated/coverage',
  verbose: true,
};
