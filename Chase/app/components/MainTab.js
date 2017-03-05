import React, { Component } from 'react'
import {
  NavigatorIOS,
  TouchableHighlight,
  View,
  ListView,
  Image,
  StyleSheet,
  Text,
  Button,
} from 'react-native'

import Catalog from './Catalog'

export default class extends Component {
  render() {
    console.log('I am MainTab - this.props is', this.props)
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: Catalog,
          title: 'Catalog',
          passProps: { ...this.props },
        }}
        style={{flex: 1}}
      />
    )
  }
}
