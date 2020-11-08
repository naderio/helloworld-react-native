import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeView from './HomeView';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="/home/main" headerMode="none">
    <Stack.Screen name="/home/main" component={HomeView} />
  </Stack.Navigator>
);
