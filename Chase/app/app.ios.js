import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { Navigation } from 'react-native-navigation'
import { iconsMap, iconsLoaded } from './utils/AppIcons'

import * as screens from './screens'
screens.register()

global.storage = new Storage({
  storageBackend: AsyncStorage,
})
console.log('[App.js] Storage', global.storage)

const navigatorStyle = {
  drawUnderTabBar: true,
  statusBarBlur: true,
  statusBarHideWithNavBar: true,
}

export default class App extends Component {
  constructor(props) {
    super(props)
    iconsLoaded.then(() => {
      this.startApp()
    })
  }

  startApp() {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Main',
          screen: 'Chase.MainTabScreen',
          icon: iconsMap['ios-paper-outline'],
          selectedIcon: iconsMap['ios-paper'],
          title: 'Main',
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
