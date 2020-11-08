import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SplashScreen from 'react-native-splash-screen';

import { COLOR } from './common/styles';

import LandingView from './Entrance/LandingView';
import Entrance from './Entrance';
import Session from './Session';

import { setKeyboardVisible } from './Shared/state';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.background,
  },
});

function App() {
  const dispatch = useDispatch();
  const appReady = useSelector((state) => state.Shared.appReady);
  const appInSession = useSelector((state) => state.Shared.appInSession);
  const authenticated = useSelector((state) => state.Auth.authenticated);

  const keyboardDidShowHandler = React.useRef(null);
  const keyboardDidHideHandler = React.useRef(null);

  React.useEffect(() => {
    if (SplashScreen) {
      SplashScreen.hide();
    }

    keyboardDidShowHandler.current = Keyboard.addListener('keyboardDidShow', () => dispatch(setKeyboardVisible(true)));

    keyboardDidHideHandler.current = Keyboard.addListener('keyboardDidHide', () => dispatch(setKeyboardVisible(false)));

    return () => {
      keyboardDidShowHandler.current.remove();
      keyboardDidHideHandler.current.remove();
    };
  }, [dispatch]);

  if (!appReady || (authenticated && !appInSession)) {
    return <LandingView />;
  }

  return <View style={styles.container}>{authenticated ? <Session /> : <Entrance />}</View>;
}

export default App;
