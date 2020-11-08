import persistAdapter from 'redux-localstorage/lib/adapters/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  return persistAdapter(AsyncStorage);
};
