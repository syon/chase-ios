import React, { Component } from 'react'
import {
  TouchableOpacity,
  ListView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

export default class extends Component {
  constructor(props) {
    super(props)
  }

  makeThumb(item) {
    const thumbsPath = 'https://d2aed4ktvx51jm.cloudfront.net/items/thumbs'
    const item10Id = `0000000000${item.itemId}`.substr(-10, 10)
    const itemId3 = item10Id.slice(0, 3)
    const imgUrl = `${thumbsPath}/${itemId3}/${item10Id}.jpg`
    return (
      <Image style={styles.thumbnail} source={{uri: imgUrl}} />
    )
  }

  render() {
    const { item } = this.props
    if (!item) { return null }
    const thumb = this.makeThumb(item)
    return (
      <View style={styles.box}>
        <View style={styles.thumbWrap}>
          { thumb }
        </View>
        <View style={styles.boxBody}>
          <Text>{ item.title }</Text>
          <Text>2017.4.17</Text>
          <Text>www000000000000000.example.com</Text>
          <Text>✓</Text>
        </View>
        <View style={styles.selectScene}>
          <Button onPress={() => {}} title="chase:a" />
          <Button onPress={() => {}} title="chase:b" />
          <Button onPress={() => {}} title="chase:c" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.2,
  },
  thumbWrap: {
    flex: 1,
    height: 100,
  },
  thumbnail: {
    flex: 1,
  },
  boxBody: {
    padding: 20,
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
})
