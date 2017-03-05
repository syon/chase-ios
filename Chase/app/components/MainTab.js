import React, { Component } from 'react'
import { View, ListView, Image, StyleSheet, Text } from 'react-native'

import Catalog from './Catalog'

export default class extends Component {
  render() {
    return (
      <Catalog {...this.props} />
    )
  }
}
