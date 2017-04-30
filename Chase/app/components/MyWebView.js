import React, { Component } from 'react'
import { View } from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props
    const wv = item ? (<WKWebView source={{ uri: item ? item.url : '' }} />) : null
    return (
      <View style={{ flex: 1 }}>
        { wv }
      </View>
    )
  }
}
