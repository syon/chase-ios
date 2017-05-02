import React, { Component } from 'react'
import { View } from 'react-native'
import WKWebView from 'react-native-wkwebview-reborn'

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { url } = this.props
    const wv = url ? (<WKWebView source={{ uri: url }} />) : null
    return (
      <View style={{ flex: 1 }}>
        { wv }
      </View>
    )
  }
}
