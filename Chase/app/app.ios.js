import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AsyncStorage } from 'react-native'
import Storage from 'react-native-storage'
import { Navigation } from 'react-native-navigation';

import './utils/ReactotronConfig'
import { iconsMap, iconsLoaded } from './utils/AppIcons'

global.storage = new Storage({
  storageBackend: AsyncStorage,
})
console.tron.info('Storage', global.storage)

class Welcome extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          Welcome to React Native!
        </Text>
      </View>
    )
  }
}

function registerScreens() {
  Navigation.registerComponent('example.WelcomeTabScreen', () => Welcome);
}
registerScreens();

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
          label: 'Welcome',
          screen: 'example.WelcomeTabScreen',
          title: 'Welcome'
        },
      ],
    })
  }
}
