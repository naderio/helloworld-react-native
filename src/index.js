import './common/init';

import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { name as APP_NAME } from '../app.json';

import AppRoot from './AppRoot';

import { setupStore } from './store';

setupStore();

AppRegistry.registerComponent(APP_NAME, () => AppRoot);
