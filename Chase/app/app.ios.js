import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons'

import configureStore from './store/configureStore';
const store = configureStore();
global.storage = new Storage({
  storageBackend: AsyncStorage,
})
console.log('[App.js] Storage', global.storage)
let unsubscribe = store.subscribe(() => {
  // console.log('[App.js] getState', store.getState())
})

import MainTab from './components/MainTab'
import LocationTab from './components/LocationTab'
import ConfigTab from './components/ConfigTab'
import Login from './components/Login'

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
  Navigation.registerComponent('Chase.MainScreen', () => MainTab, store, Provider);
  Navigation.registerComponent('Chase.ConfigScreen', () => ConfigTab, store, Provider);
  Navigation.registerComponent('Chase.LoginScreen', () => Login, store, Provider);
}
registerScreens();

export default class App extends Component {
	constructor(props) {
		super(props)
    this.startApp()
	}

	startApp() {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: 'Main',
					screen: 'Chase.MainScreen',
					icon: (<Icon name="ios-wine-outline" size={30} color="#900" />),
					selectedIcon: (<Icon name="ios-wine" size={30} color="#900" />),
					title: 'Main',
				},
				{
					label: 'Config',
					screen: 'Chase.ConfigScreen',
					icon: (<Icon name="ios-trophy-outline" size={30} color="#900" />),
					selectedIcon: (<Icon name="ios-trophy" size={30} color="#900" />),
					title: 'Config',
				},
				{
					label: 'Login',
					screen: 'Chase.LoginScreen',
					icon: (<Icon name="ios-trophy-outline" size={30} color="#900" />),
					selectedIcon: (<Icon name="ios-trophy" size={30} color="#900" />),
					title: 'Login',
				},
			],
		})
	}
}
