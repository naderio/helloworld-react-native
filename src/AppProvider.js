import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Root as NativeBaseRoot, StyleProvider, getTheme } from 'native-base';

import * as PropTypes from './common/proptypes';

import { THEME } from './common/styles';

function AppProvider({ store, children }) {
  return (
    <StateProvider store={store}>
      <NativeBaseRoot>
        <StyleProvider style={getTheme(THEME)}>
          <NavigationContainer>{children}</NavigationContainer>
        </StyleProvider>
      </NativeBaseRoot>
    </StateProvider>
  );
}

AppProvider.propTypes = {
  store: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

export default AppProvider;
