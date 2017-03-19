import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import configureStore from '../store/configureStore';
import MainTab from './MainTab'
import LocationTab from './LocationTab'
import ConfigTab from './ConfigTab'
import Login from './Login'

const store = configureStore();
let unsubscribe = store.subscribe(() => {
  // console.log('[App.js] getState', store.getState())
})

export function register() {
  Navigation.registerComponent('Chase.MainScreen', () => MainTab, store, Provider)
  Navigation.registerComponent('Chase.ConfigScreen', () => ConfigTab, store, Provider)
  Navigation.registerComponent('Chase.LoginScreen', () => Login, store, Provider)
}
