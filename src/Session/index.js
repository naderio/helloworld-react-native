import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import NavigationMenu from './NavigationMenu';

import DebugView from '../Shared/DebugView';
import DraftView from '../Shared/DraftView';

import Home from '../Home';
import ProfileView from './ProfileView';
import AboutView from './AboutView';

const MainStack = createDrawerNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator initialRouteName="/home" drawerContent={() => <NavigationMenu />}>
    {process.env.NODE_ENV === 'development' && <MainStack.Screen name="/debug" component={DebugView} />}
    {process.env.NODE_ENV === 'development' && <MainStack.Screen name="/draft" component={DraftView} />}
    <MainStack.Screen name="/home" component={Home} />
    <MainStack.Screen name="/profile" component={ProfileView} />
    <MainStack.Screen name="/about" component={AboutView} />
  </MainStack.Navigator>
);

const RootStack = createStackNavigator();

const RootModal = (props) => (props.route.params.render ? props.route.params.render(props) : null);

const RootStackNavigator = () => (
  <RootStack.Navigator
    initialRouteName="/main"
    headerMode="none"
    mode="modal"
    screenOptions={{
      cardStyle: { backgroundColor: 'transparent' },
    }}
  >
    <RootStack.Screen name="/main" component={MainStackNavigator} />
    <RootStack.Screen name="/modal" component={RootModal} />
  </RootStack.Navigator>
);

export default RootStackNavigator;
