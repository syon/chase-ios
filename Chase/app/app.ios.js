import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import * as screens from './screens'
screens.register()

global.storage = new Storage({
  storageBackend: AsyncStorage,
})
console.log('[App.js] Storage', global.storage)

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
