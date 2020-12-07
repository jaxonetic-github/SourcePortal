module.exports = {
  preset: 'react-native',
  // "testEnvironment": "jsdom",
  transformIgnorePatterns: [
    '/node_modules/(?!react-native|react-clone-referenced-element|react-navigation|native-base-shoutem-theme|@codler/react-native-keyboard-aware-scroll-view)',
  ],
  testRegex: '/__tests__/.*|((\\.|/*.)(spec))\\.js?$',//'/__tests__/ProfileViewSpec.js',
  // "setupFilesAfterEnv": [ "<rootDir>/jest.setup.js" ]
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
