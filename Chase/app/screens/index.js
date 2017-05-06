import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import configureStore from '../store/configureStore'
import MainTab from './MainTab'
import SceneTab from './SceneTab'
import TagsTab from './TagsTab'
import TagsTabInner from './TagsTabInner'
import ConfigTab from './ConfigTab'
import ScenesEditor from './ScenesEditor'
import Login from './Login'
import Interlude from './Interlude'
import MyWebView from '../components/MyWebView'

const store = configureStore()

export function register() {
  Navigation.registerComponent('Chase.MainTabScreen', () => MainTab, store, Provider)
  Navigation.registerComponent('Chase.SceneTabScreen', () => SceneTab, store, Provider)
  Navigation.registerComponent('Chase.TagsTabScreen', () => TagsTab, store, Provider)
  Navigation.registerComponent('Chase.TagsTabInnerScreen', () => TagsTabInner, store, Provider)
  Navigation.registerComponent('Chase.ConfigTabScreen', () => ConfigTab, store, Provider)
  Navigation.registerComponent('Chase.ScenesEditor', () => ScenesEditor, store, Provider)
  Navigation.registerComponent('Chase.LoginScreen', () => Login, store, Provider)
  Navigation.registerComponent('Chase.Interlude', () => Interlude, store, Provider)
  Navigation.registerComponent('Chase.WebViewScreen', () => MyWebView, store, Provider)
}
