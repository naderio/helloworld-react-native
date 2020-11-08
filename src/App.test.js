import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';

import { setupStore } from './store';

import AppRoot from './AppRoot';

describe('App', () => {
  jest.useFakeTimers();

  beforeEach(setupStore);

  test('renders correctly', () => {
    const { baseElement } = render(<AppRoot />);

    expect(baseElement).toMatchSnapshot();
  });
});
