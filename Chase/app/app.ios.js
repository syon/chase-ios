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
          screen: 'Chase.MainScreen',
          icon: iconsMap['ios-paper-outline'],
          selectedIcon: iconsMap['ios-paper'],
          title: 'Main',
        },
        {
          label: 'Config',
          screen: 'Chase.ConfigScreen',
          icon: iconsMap['ios-options-outline'],
          selectedIcon: iconsMap['ios-options'],
          title: 'Config',
        },
        {
          label: 'Login',
          screen: 'Chase.LoginScreen',
          icon: iconsMap['ios-options-outline'],
          selectedIcon: iconsMap['ios-options'],
          title: 'Login',
        },
      ],
    })
  }
}
