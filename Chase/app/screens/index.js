import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import configureStore from '../store/configureStore';
import MainTab from './MainTab'
import SceneTab from './SceneTab'
import ConfigTab from './ConfigTab'
import Login from './Login'
import MyWebView from '../components/MyWebView'

const store = configureStore();
let unsubscribe = store.subscribe(() => {
  // console.log('[App.js] getState', store.getState())
})

export function register() {
  Navigation.registerComponent('Chase.MainTabScreen', () => MainTab, store, Provider)
  Navigation.registerComponent('Chase.SceneTabScreen', () => SceneTab, store, Provider)
  Navigation.registerComponent('Chase.ConfigTabScreen', () => ConfigTab, store, Provider)
  Navigation.registerComponent('Chase.LoginScreen', () => Login, store, Provider)
  Navigation.registerComponent('Chase.WebViewScreen', () => MyWebView, store, Provider)
}
