import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import configureStore from './store/configureStore';
const store = configureStore();

let unsubscribe = store.subscribe(() => {
  // console.log('[App.js] getState', store.getState())
})

import MainTab from './components/MainTab'
import LocationTab from './components/LocationTab'
import ConfigTab from './components/ConfigTab'
import Login from './components/Login'

export default function registerScreens() {
  Navigation.registerComponent('Chase.MainScreen', () => MainTab, store, Provider)
  Navigation.registerComponent('Chase.ConfigScreen', () => ConfigTab, store, Provider)
  Navigation.registerComponent('Chase.LoginScreen', () => Login, store, Provider)
}
