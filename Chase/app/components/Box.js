import React, { Component } from 'react'
import {
  TouchableOpacity,
  ListView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class extends Component {
  constructor(props) {
    super(props)
    this.onThumbPress = this.onThumbPress.bind(this)
  }

  makeThumb(item) {
    const imgUrl = this.makeImgUrl(item)
    return (
      <Image style={styles.thumbnail} source={{uri: imgUrl}} />
    )
  }

  makeImgUrl(item) {
    const thumbsPath = 'https://d2aed4ktvx51jm.cloudfront.net/items/thumbs'
    const item10Id = `0000000000${item.itemId}`.substr(-10, 10)
    const itemId3 = item10Id.slice(0, 3)
    return `${thumbsPath}/${itemId3}/${item10Id}.jpg`
  }

  onThumbPress() {
    const imgUrl = this.makeImgUrl(this.props.item)
    this.props.navigator.push({
      screen: "Chase.Interlude",
      passProps: { item: this.props.item, imgUrl },
      navigatorStyle: {
        tabBarHidden: true,
      },
    });
  }

  render() {
    const { item } = this.props
    if (!item) { return null }
    const thumb = this.makeThumb(item)
    return (
      <View style={styles.box}>
        <TouchableWithoutFeedback onPress={this.onThumbPress}>
          <View onPress={this.onThumbPress} style={styles.thumbWrap}>
            { thumb }
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.boxBody}>
          <Text style={styles.itemTitle}>{ item.title }</Text>
          <Text style={styles.domain}>{ item.fqdn }</Text>
        </View>
        <View style={styles.selectScene}>
          <Button onPress={() => {}} style={styles.sceneBtn}>自宅</Button>
          <Button onPress={() => {}} style={styles.sceneBtn}>職場</Button>
          <Button onPress={() => {}} style={styles.sceneBtn}>暇つぶし</Button>
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  itemTitle: {
    fontSize: responsiveFontSize(2.5),
    lineHeight: responsiveFontSize(3),
    marginBottom: 3,
  },
  domain: {
    fontSize: responsiveFontSize(1.5),
    color: '#a3aab1',
  },
  selectScene: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },
  sceneBtn: {
    fontSize: responsiveFontSize(2),
    padding: 10,
    overflow: 'hidden',
  },
})
