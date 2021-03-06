import { Component } from 'react'
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { Navigation } from 'react-native-navigation'

import './utils/Tron'
import { iconsMap, iconsLoaded } from './utils/AppIcons'
import * as screens from './screens'

screens.register()

global.storage = new Storage({
  storageBackend: AsyncStorage,
})
console.tron.info('Storage', global.storage)

const navigatorStyle = {
  /* Statusbar */
  statusBarBlur: true,
  // statusBarHideWithNavBar: true,
  /* Navbar */
  navBarHidden: true,
  // drawUnderNavBar: true,
  // navBarTransparent: true,
  // navBarHideOnScroll: true,
  navBarTranslucent: true,
  // navBarBlur: true,
  /* Tabbar */
  drawUnderTabBar: true,
}

export default class App extends Component {

  constructor(props) {
    super(props)
    iconsLoaded.then(() => {
      App.startApp()
    })
  }

  static startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Inbox',
          screen: 'Chase.MainTabScreen',
          icon: iconsMap['ios-filing-outline'],
          selectedIcon: iconsMap['ios-filing'],
          title: 'Inbox',
          navigatorStyle,
        },
        {
          label: 'Scene',
          screen: 'Chase.SceneTabScreen',
          icon: iconsMap['ios-glasses-outline'],
          selectedIcon: iconsMap['ios-glasses'],
          title: 'Scene',
          navigatorStyle,
        },
        {
          label: 'Tags',
          screen: 'Chase.TagsTabScreen',
          icon: iconsMap['ios-pricetags-outline'],
          selectedIcon: iconsMap['ios-pricetags'],
          title: 'Tags',
          navigatorStyle,
        },
        {
          label: 'Config',
          screen: 'Chase.ConfigTabScreen',
          icon: iconsMap['ios-options-outline'],
          selectedIcon: iconsMap['ios-options'],
          title: 'Config',
          navigatorStyle,
        },
      ],
    })
  }

}
