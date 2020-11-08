/* eslint-env jest */
/* eslint-disable import/first */
/* eslint-disable global-require */

process.env.DEBUG_COLORS = '0';
process.env.DEBUG_HIDE_DATE = '1';

require('./src/common/init');

import 'react-native-gesture-handler/jestSetup';

import mockReactNativeAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

globalThis.FormData = require('formdata-node');

require('whatwg-fetch');

jest.mock('@react-native-community/async-storage', () => mockReactNativeAsyncStorage);

jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line global-require
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
