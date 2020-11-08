import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DebugView from '../Shared/DebugView';

import LoginView from './LoginView';
import SignupView from './SignupView';
import PasswordResetView from './PasswordResetView';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="/login" headerMode="none">
    {process.env.NODE_ENV === 'development' && <Stack.Screen name="/debug" component={DebugView} />}
    <Stack.Screen name="/login" component={LoginView} />
    <Stack.Screen name="/signup" component={SignupView} />
    <Stack.Screen name="/password-reset" component={PasswordResetView} />
  </Stack.Navigator>
);
