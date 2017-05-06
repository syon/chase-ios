import React, { Component } from 'react'
import { View, WebView } from 'react-native'

export default class extends Component {
  render() {
    const { url } = this.props
    const wv = url ? (<WebView source={{ uri: url }} />) : null
    return (
      <View style={{ flex: 1 }}>
        { wv }
      </View>
    )
  }
}
